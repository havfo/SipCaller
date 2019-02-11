import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as stateActions from '../../actions/stateActions';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContent from './MySnackbarContent';

const Notifications = (props) =>
{
	const {
		notifications,
		onClose
	} = props;

	return (
		<div>
			{
				notifications.map((notification) =>
				{
					return (
						<Snackbar
							key={notification.id}
							anchorOrigin={{
								vertical   : 'bottom',
								horizontal : 'right',
							}}
							open={Boolean(true)}
							autoHideDuration={notification.timeout}
							onClose={() => onClose(notification.id)}
						>
							<MySnackbarContent
								onClose={() => onClose(notification.id)}
								variant={notification.type}
								message={notification.text}
							/>
						</Snackbar>
					);
				})
			}
		</div>
	);
};

Notifications.propTypes =
{
	notifications : PropTypes.array.isRequired,
	onClose       : PropTypes.func.isRequired
};

const mapStateToProps = (state) =>
	({
		notifications : state.notifications
	});

const mapDispatchToProps = (dispatch) =>
	({
		onClose : (notificationId) =>
			dispatch(stateActions.removeNotification(notificationId))
	});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notifications);
