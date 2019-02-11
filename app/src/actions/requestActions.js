import randomString from 'random-string';
import * as stateActions from './stateActions';

// This returns a redux-thunk action (a function).
export const notify = ({ type = 'info', text, timeout }) =>
{
	if (!timeout)
	{
		switch (type)
		{
			case 'warning':
			case 'error':
				timeout = 5000;
				break;
			case 'success':
			case 'info':
			default:
				timeout = 3000;
				break;
		}
	}

	const notification =
	{
		id      : randomString({ length: 6 }).toLowerCase(),
		type    : type,
		text    : text,
		timeout : timeout
	};

	return (dispatch) =>
	{
		dispatch(stateActions.addNotification(notification));

		setTimeout(() =>
		{
			dispatch(stateActions.removeNotification(notification.id));
		}, timeout);
	};
};