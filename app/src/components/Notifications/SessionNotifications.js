import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSipCallerContext } from '../../sipCallerContext';
import { withStyles } from '@material-ui/core/styles';
import * as sessionStates from '../../sessionStates';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	container :
	{
		position       : 'fixed',
		top            : 0,
		right          : 0,
		bottom         : 0,
		padding        : 20,
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end',
		transition     : 'right 0.3s'
	},
	card :
	{
		width     : 300,
		marginTop : 5
	}
};

const SessionNotifications = (props) =>
{
	const {
		sipCaller,
		incomingSessions,
		classes
	} = props;

	return (
		<div className={classes.container}>
			{ incomingSessions.map((session) =>
			{
				return (
					<Card key={session.sipSession.request.callId} className={classes.card}>
						<CardActionArea>
							<CardContent>
								<Typography gutterBottom variant='h6' component='h2'>
									Incoming call
								</Typography>
								<Typography component='p' noWrap>
									{ session.sipSession.remoteIdentity.displayName ||
										session.sipSession.remoteIdentity.uri.user }
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								size='small'
								color='primary'
								onClick={() => sipCaller.accept(session.sipSession)}
							>
								Answer
							</Button>
							<Button
								size='small'
								color='primary'
								onClick={() => sipCaller.terminate(session.sipSession)}
							>
								Decline
							</Button>
						</CardActions>
					</Card>
				);
			})}
		</div>
	);
};

SessionNotifications.propTypes = {
	sipCaller        : PropTypes.object.isRequired,
	incomingSessions : PropTypes.array.isRequired,
	classes          : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		incomingSessions :
			Object.values(state.sessions).filter((session) =>
				(session.sessionState === sessionStates.NEW &&
				session.direction === sessionStates.INCOMING))
	});

export default withSipCallerContext(
	connect(mapStateToProps, null)(withStyles(styles)(SessionNotifications))
);