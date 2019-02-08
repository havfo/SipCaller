const sessionHistory = (state = [], action) =>
{
	switch (action.type)
	{
		case 'ADD_SESSION_ENTRY':
		{
			const {
				displayName,
				sipUri,
				direction,
				startTime
			} = action.payload;

			return [
				...state,
				{
					displayName,
					sipUri,
					direction,
					startTime
				}
			];
		}

		case 'CLEAR_SESSION_HISTORY':
		{
			return [];
		}

		default:
			return state;
	}
};

export default sessionHistory;