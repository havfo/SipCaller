import * as sip from 'sip.js';
import * as stateActions from './actions/stateActions';
import * as requestActions from './actions/requestActions';
import * as sessionStates from './sessionStates';
import Logger from './logger';

const logger = new Logger('SipCaller');

let store;

export default class SipCaller
{
	/**
	 * @param  {Object} data
	 * @param  {Object} data.store - The Redux store.
	 */
	static init(data)
	{
		store = data.store;
	}

	constructor()
	{
		logger.debug('constructor()');

		this._ua = null;

		this._init();
	}

	_init()
	{
		logger.debug('_init()');

		const { autoRegister } = store.getState().user;

		if (autoRegister)
			this.register();
	}

	register()
	{
		logger.debug('register()');

		const {
			displayName,
			sipUri,
			password,
			outboundProxy
		} = store.getState().user;

		store.dispatch(stateActions.setRegisterInProgress());

		this._ua = new sip.UA({
			uri              : sipUri,
			password         : password,
			displayName      : displayName,
			transportOptions : {
				wsServers : [ outboundProxy ],
				traceSip  : true
			},
			sessionDescriptionHandlerFactoryOptions : {
				peerConnectionOptions : {
					rtcConfiguration : {
						iceServers : [ {
							urls       : 'turn:turn.uninett.no:443?transport=tcp',
							username   : 'websip',
							credential : 'websip'
						} ]
					}
				}
			}
		});

		this._ua.on('registered', () =>
		{
			logger.debug('Registered');

			store.dispatch(requestActions.notify(
				{
					type : 'success',
					text : 'Successfully registered.'
				})
			);

			store.dispatch(stateActions.setRegistrationMessage({ registrationMessage: 'Success' }));
			store.dispatch(stateActions.setRegistered({ registered: true }));
		});

		this._ua.on('registrationFailed', (response, cause) =>
		{
			logger.debug('Registration failed [cause: %s]', cause);

			store.dispatch(requestActions.notify(
				{
					type : 'error',
					text : `Registration failed: ${cause}`
				})
			);

			store.dispatch(stateActions.setRegistrationMessage({ registrationMessage: cause }));
			store.dispatch(stateActions.setRegistered({ registered: false }));
		});

		this._ua.on('unregistered', (response, cause) =>
		{
			logger.debug('Unregistered [cause: %s]', cause);

			store.dispatch(requestActions.notify(
				{
					text : `Unregistered: ${cause}`
				})
			);

			store.dispatch(stateActions.setRegistrationMessage({ registrationMessage: cause }));
			store.dispatch(stateActions.setRegistered({ registered: false }));
		});

		this._ua.on('invite', (sipSession) =>
		{
			logger.debug('Incoming invite [sipSession: %o]', sipSession);

			store.dispatch(requestActions.notify(
				{
					text : `Incoming call from: ${sipSession.remoteIdentity.uri.user}`
				})
			);

			this._handleSession(sipSession, sessionStates.INCOMING);
		});
	}

	unRegister()
	{
		logger.debug('unRegister()');

		this._ua.unregister();
	}

	_handleSession(sipSession, direction)
	{
		logger.debug('_handleSession() [sipSession: %o]', sipSession);

		const startTime = Date.now();

		sipSession.on('trackAdded', () =>
		{
			logger.debug('SipSession trackAdded [sipSession: %o]', sipSession);

			const pc = sipSession.sessionDescriptionHandler.peerConnection;

			// Gets remote tracks
			const remoteStream = new MediaStream();

			pc.getReceivers().forEach((receiver) =>
			{
				if (receiver.track)
					remoteStream.addTrack(receiver.track);
			});

			store.dispatch(stateActions.addRemoteStream({ sipSession, remoteStream }));

			// Gets local tracks
			const localStream = new MediaStream();

			pc.getSenders().forEach((sender) =>
			{
				if (sender.track)
					localStream.addTrack(sender.track);
			});

			store.dispatch(stateActions.addLocalStream({ sipSession, localStream }));
		});

		sipSession.on('replaced', (newSipSession) =>
		{
			logger.debug('SipSession replaced [oldSipSession: %o, newSipSession: %o]', sipSession, newSipSession);

			this._handleSession(newSipSession, direction);
		});

		sipSession.on('directionChanged', () =>
		{
			const newDirection = sipSession.sessionDescriptionHandler.getDirection();

			if (newDirection === 'sendrecv')
			{
				logger.debug('SipSession not on hold [sipSession: %o]', sipSession);
			}
			else
			{
				logger.debug('SipSession on hold [sipSession: %o]', sipSession);
			}
		});

		sipSession.on('progress', (response) =>
		{
			logger.debug('SipSession progress [response: %o, sipSession: %o]', response, sipSession);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.PROGRESS
				})
			);
		});

		sipSession.on('accepted', (data) =>
		{
			logger.debug('SipSession accepted [data: %o, sipSession: %o]', data, sipSession);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.ACCEPTED
				})
			);
		});

		sipSession.on('bye', (request) =>
		{
			logger.debug('SipSession bye [request: %o, sipSession: %o]', request, sipSession);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.TERMINATED
				})
			);
		});

		sipSession.on('cancel', () =>
		{
			logger.debug('SipSession canceled [sipSession: %o]', sipSession);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.CANCELED
				})
			);
		});

		sipSession.on('rejected', (response, cause) =>
		{
			logger.debug(
				'SipSession rejected [response: %o, cause: %s, sipSession: %o]',
				response,
				cause,
				sipSession
			);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.REJECTED
				})
			);
		});

		sipSession.on('failed', (response, cause) =>
		{
			logger.debug(
				'SipSession failed [response: %o, cause: %s, sipSession: %o]',
				response,
				cause,
				sipSession
			);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.FAILED
				})
			);
		});

		sipSession.on('terminated', (message, cause) =>
		{
			logger.debug(
				'SipSession terminated [message: %o, cause: %s, sipSession: %o]',
				message,
				cause,
				sipSession
			);

			store.dispatch(requestActions.notify(
				{
					text : `Call terminated: ${sipSession.remoteIdentity.uri.user}`
				})
			);

			store.dispatch(
				stateActions.setSessionState({
					sipSession,
					sessionState : sessionStates.TERMINATED
				})
			);

			const displayName =
				sipSession.remoteIdentity.displayName ||
				sipSession.remoteIdentity.uri.user;
			const sipUri = sipSession.remoteIdentity.uri.toString();

			store.dispatch(
				stateActions.addSessionToHistory({
					displayName,
					sipUri,
					startTime
				})
			);

			setTimeout(() =>
			{
				logger.debug('SipSession removed [sipSession: %o]', sipSession);

				store.dispatch(stateActions.removeSession({ sipSession }));
			}, 10000);
		});

		store.dispatch(stateActions.addSession({ sipSession, direction }));
	}

	accept(sipSession)
	{
		logger.debug('accept() [sipSession: %o]', sipSession);

		const {
			videoEnabled
		} = store.getState().user;

		sipSession.accept({
			sessionDescriptionHandlerOptions :
			{
				constraints :
				{
					audio : true,
					video : videoEnabled
				}
			}
		});
	}

	terminate(sipSession)
	{
		logger.debug('terminate() [sipSession: %o]', sipSession);

		sipSession.terminate();
	}

	invite(sipUri)
	{
		logger.debug('invite() [sipUri: %s]', sipUri);

		const {
			videoEnabled
		} = store.getState().user;

		const sipSession = this._ua.invite(sipUri, {
			sessionDescriptionHandlerOptions :
			{
				constraints :
				{
					audio : true,
					video : videoEnabled
				}
			}
		});

		this._handleSession(sipSession, sessionStates.OUTGOING);
		store.dispatch(
			stateActions.setCurrentSession({
				currentSession : sipSession.request.callId
			})
		);
	}
}