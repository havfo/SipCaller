const initialState =
{
	displayName   : null,
	sipUri        : null,
	password      : null,
	outboundProxy : null,
	autoRegister  : false,
	videoEnabled  : true,
	requestUri    : null,
	transferUri   : null
};

const user = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_USER':
		{
			const {
				displayName,
				sipUri,
				password,
				outboundProxy,
				autoRegister
			} = action.payload;

			return {
				...state,
				displayName,
				sipUri,
				password,
				outboundProxy,
				autoRegister
			};
		}

		case 'SET_DISPLAY_NAME':
		{
			const { displayName } = action.payload;

			return { ...state, displayName };
		}

		case 'SET_SIP_URI':
		{
			const { sipUri } = action.payload;

			return { ...state, sipUri };
		}

		case 'SET_PASSWORD':
		{
			const { password } = action.payload;

			return { ...state, password };
		}

		case 'SET_OUTBOUND_PROXY':
		{
			const { outboundProxy } = action.payload;

			return { ...state, outboundProxy };
		}

		case 'SET_AUTO_REGISTER':
		{
			const { autoRegister } = action.payload;

			return { ...state, autoRegister };
		}

		case 'TOGGLE_VIDEO':
		{
			const videoEnabled = !state.videoEnabled;

			return { ...state, videoEnabled };
		}

		case 'SET_REQUEST_URI':
		{
			const { requestUri } = action.payload;

			return { ...state, requestUri };
		}

		case 'SET_TRANSFER_URI':
		{
			const { transferUri } = action.payload;

			return { ...state, transferUri };
		}

		default:
			return state;
	}
};

export default user;