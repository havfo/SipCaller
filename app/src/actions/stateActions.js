export const setUser = ({
	displayName,
	sipUri,
	password,
	outboundProxy,
	autoRegister
}) => (dispatch) =>
{
	dispatch({
		type    : 'SET_USER',
		payload :
		{
			displayName,
			sipUri,
			password,
			outboundProxy,
			autoRegister
		}
	});
};

export const setDisplayName = ({ displayName }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_DISPLAY_NAME',
		payload : { displayName }
	});
};

export const setSipUri = ({ sipUri }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_SIP_URI',
		payload : { sipUri }
	});
};

export const setPassword = ({ password }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_PASSWORD',
		payload : { password }
	});
};

export const setOutboundProxy = ({ outboundProxy }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_OUTBOUND_PROXY',
		payload : { outboundProxy }
	});
};

export const setRequestUri = ({ requestUri }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_REQUEST_URI',
		payload : { requestUri }
	});
};

export const setTransferUri = ({ transferUri }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_TRANSFER_URI',
		payload : { transferUri }
	});
};

export const setAutoRegister = ({ autoRegister }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_AUTO_REGISTER',
		payload : { autoRegister }
	});
};

export const setRegistered = ({ registered }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_REGISTERED',
		payload : { registered }
	});
};

export const setRegisterInProgress = () => (dispatch) =>
{
	dispatch({
		type : 'SET_REGISTER_IN_PROGRESS'
	});
};

export const setRegistrationMessage = ({ registrationMessage }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_REGISTRATION_MESSAGE',
		payload : { registrationMessage }
	});
};

export const addSession = ({ sipSession, direction }) => (dispatch) =>
{
	dispatch({
		type    : 'ADD_SESSION',
		payload : { sipSession, direction }
	});
};

export const removeSession = ({ sipSession }) => (dispatch) =>
{
	dispatch({
		type    : 'REMOVE_SESSION',
		payload : { sipSession }
	});
};

export const addRemoteStream = ({ sipSession, remoteStream }) => (dispatch) =>
{
	dispatch({
		type    : 'ADD_REMOTE_STREAM',
		payload : { sipSession, remoteStream }
	});
};

export const addLocalStream = ({ sipSession, localStream }) => (dispatch) =>
{
	dispatch({
		type    : 'ADD_LOCAL_STREAM',
		payload : { sipSession, localStream }
	});
};

export const toggleRemoteAudio = ({ sipSession }) => (dispatch) =>
{
	dispatch({
		type    : 'TOGGLE_REMOTE_AUDIO',
		payload : { sipSession }
	});
};

export const toggleRemoteVideo = ({ sipSession }) => (dispatch) =>
{
	dispatch({
		type    : 'TOGGLE_REMOTE_VIDEO',
		payload : { sipSession }
	});
};

export const toggleLocalAudio = ({ sipSession }) => (dispatch) =>
{
	dispatch({
		type    : 'TOGGLE_LOCAL_AUDIO',
		payload : { sipSession }
	});
};

export const toggleLocalVideo = ({ sipSession }) => (dispatch) =>
{
	dispatch({
		type    : 'TOGGLE_LOCAL_VIDEO',
		payload : { sipSession }
	});
};

export const setSessionState = ({ sipSession, sessionState }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_SESSION_STATE',
		payload : { sipSession, sessionState }
	});
};

export const setCurrentSession = ({ currentSession }) => (dispatch) =>
{
	dispatch({
		type    : 'SET_CURRENT_SESSION',
		payload : { currentSession }
	});
};

export const addSessionToHistory = ({
	displayName,
	sipUri,
	direction,
	startTime
}) => (dispatch) =>
{
	dispatch({
		type    : 'ADD_SESSION_ENTRY',
		payload :
		{
			displayName,
			sipUri,
			direction,
			startTime
		}
	});
};

export const clearSessionHistory = () => (dispatch) =>
{
	dispatch({
		type : 'CLEAR_SESSION_HISTORY'
	});
};

export const toggleVideo = () => (dispatch) =>
{
	dispatch({
		type : 'TOGGLE_VIDEO'
	});
};

export const addNotification = (notification) =>
{
	return {
		type    : 'ADD_NOTIFICATION',
		payload : { notification }
	};
};

export const removeNotification = (notificationId) =>
{
	return {
		type    : 'REMOVE_NOTIFICATION',
		payload : { notificationId }
	};
};

export const removeAllNotifications = () =>
{
	return {
		type : 'REMOVE_ALL_NOTIFICATIONS'
	};
};
