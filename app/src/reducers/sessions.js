import omit from 'lodash.omit';
import * as sessionStates from '../sessionStates';

const initialState =
{
	sipSession   : null, // SIP.js session object
	direction    : null,
	remoteStream : null, // MediaStream
	localStream  : null, // MediaStream
	sessionState : sessionStates.NEW // State of session
};

const session = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'ADD_SESSION':
		{
			const {
				sipSession,
				direction
			} = action.payload;

			return { ...state, sipSession, direction };
		}

		case 'ADD_REMOTE_STREAM':
		{
			const {
				remoteStream
			} = action.payload;

			return { ...state, remoteStream };
		}

		case 'ADD_LOCAL_STREAM':
		{
			const {
				localStream
			} = action.payload;

			return { ...state, localStream };
		}

		case 'SET_SESSION_STATE':
		{
			const {
				sessionState
			} = action.payload;

			return { ...state, sessionState };
		}

		default:
			return state;
	}
};

const sessions = (state = {}, action) =>
{
	switch (action.type)
	{
		case 'ADD_SESSION':
		{
			const {
				sipSession
			} = action.payload;

			const callId = sipSession.request.callId;

			return {
				...state,
				[callId] : session(undefined, action)
			};
		}

		case 'REMOVE_SESSION':
		{
			const {
				sipSession
			} = action.payload;

			const callId = sipSession.request.callId;

			return omit(state, callId);
		}

		case 'ADD_REMOTE_STREAM':
		case 'ADD_LOCAL_STREAM':
		case 'SET_SESSION_STATE':
		{
			const { sipSession } = action.payload;
			const callId = sipSession.request.callId;

			const oldSession = state[callId];

			if (!oldSession)
			{
				throw new Error('No session found');
			}

			return { ...state, [callId]: session(oldSession, action) };
		}

		default:
			return state;
	}
};

export default sessions;