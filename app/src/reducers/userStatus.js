const initialState =
{
	registerInProgress  : false,
	registered          : false,
	registrationMessage : null,
	currentSession      : null
};

const userStatus = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_REGISTERED':
		{
			const { registered } = action.payload;

			return {
				...state,
				registered,
				registerInProgress : false
			};
		}

		case 'SET_REGISTRATION_MESSAGE':
		{
			const { registrationMessage } = action.payload;

			return { ...state, registrationMessage };
		}

		case 'SET_REGISTER_IN_PROGRESS':
		{
			return { ...state, registerInProgress: true };
		}

		case 'ADD_SESSION':
		{
			const {
				sipSession
			} = action.payload;

			const callId = sipSession.request.callId;

			if (state.currentSession)
				return state;
			else
				return { ...state, currentSession: callId };
		}

		case 'REMOVE_SESSION': // Check if removed session is current
		{
			const {
				sipSession
			} = action.payload;

			const callId = sipSession.request.callId;

			if (state.currentSession === callId)
				return { ...state, currentSession: null };
			else
				return state;
		}

		case 'SET_CURRENT_SESSION':
		{
			const { currentSession } = action.payload;

			return { ...state, currentSession };
		}

		default:
			return state;
	}
};

export default userStatus;