import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as stateActions from '../../actions/stateActions';
import * as sessionStates from '../../sessionStates';
import { withStyles } from '@material-ui/core/styles';
import { withSipCallerContext } from '../../sipCallerContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = (theme) =>
	({
		paper :
		{
			padding : theme.spacing.unit * 2
		},
		iconGreen :
		{
			color : 'green'
		},
		iconRed :
		{
			color : 'red'
		}
	});

const Sessions = (props) =>
{
	const {
		sipCaller,
		sessions,
		currentSession,
		setCurrentSession,
		classes
	} = props;

	return (
		<Paper className={classes.paper}>
			{ Object.keys(sessions).length > 0 ?
				<List>
					{ Object.keys(sessions).map((callId) =>
					{
						const session = sessions[callId];
						const sipSession = session.sipSession;
						const displayName = 
							sipSession.remoteIdentity.displayName ||
							sipSession.remoteIdentity.uri.user;
						const sipUri = sipSession.remoteIdentity.uri.toString();
						const answer =
							session.direction === sessionStates.INCOMING &&
							session.sessionState === sessionStates.NEW;

						return (
							<ListItem
								key={callId}
								button
								selected={callId === currentSession}
								onClick={() => setCurrentSession(callId)}
								disabled={session.sessionState === sessionStates.TERMINATED}
							>
								<ListItemText
									primary={displayName}
									secondary={sipUri}
								/>
								<IconButton
									className={answer ? classes.iconGreen : classes.iconRed}
									aria-label='Answer'
									onClick={
										() =>
										{
											if (answer)
											{
												sipCaller.accept(sipSession);
											}
											else
											{
												sipCaller.terminate(sipSession);
											}
										}
									}
								>
									{ answer ?
										<CallIcon />
										:<CallEndIcon />
									}
								</IconButton>
							</ListItem>
						);
					})}
				</List>
				:
				<Typography
					color='inherit'
					noWrap
				>
					No sessions
				</Typography>
			}
		</Paper>
	);
};

Sessions.propTypes =
{
	sipCaller         : PropTypes.object.isRequired,
	sessions          : PropTypes.object.isRequired,
	currentSession    : PropTypes.string,
	setCurrentSession : PropTypes.func.isRequired,
	classes           : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		sessions       : state.sessions,
		currentSession : state.userStatus.currentSession
	});

const mapDispatchToProps = (dispatch) =>
	({
		setCurrentSession : (callId) => dispatch(
			stateActions.setCurrentSession({ currentSession: callId }))
	});

export default withSipCallerContext(
	connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sessions))
);
