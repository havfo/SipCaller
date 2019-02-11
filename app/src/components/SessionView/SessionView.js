import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSipCallerContext } from '../../sipCallerContext';
import { withStyles } from '@material-ui/core/styles';
import * as sessionStates from '../../sessionStates';
import MediaView from './MediaView/MediaView';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VolumeOnIcon from '@material-ui/icons/VolumeUp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const styles = (theme) =>
	({
		button :
		{
			margin : theme.spacing.unit
		},
		buttonList :
		{
			position  : 'absolute',
			bottom    : '1vh',
			transform : 'translate(-50%, 0)',
			left      : '50%'
		},
		card :
		{
			position  : 'absolute',
			bottom    : '50vh',
			transform : 'translate(-50%, 0)',
			left      : '50%',
			textAlign : 'center'
		},
		sessionView :
		{
			position  : 'absolute',
			width     : '100%',
			height    : '100%',
			textAlign : 'center'
		}
	});

const SessionView = (props) =>
{
	const {
		sipCaller,
		session,
		classes
	} = props;

	if (session && session.sessionState === sessionStates.TERMINATED)
	{
		const sipSession = session.sipSession;
		const displayName =
			sipSession.remoteIdentity.displayName ||
			sipSession.remoteIdentity.uri.user;
		const sipUri = sipSession.remoteIdentity.uri.toString();

		return (
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h3' noWrap>
						Session ended
					</Typography>
					<Divider />
					<Typography variant='h4' noWrap>
						{ displayName }
					</Typography>
					<Typography variant='h5' noWrap>
						{ sipUri }
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (session && session.remoteStream)
	{
		return (
			<div className={classes.sessionView}>
				<MediaView
					mediaStream={session.remoteStream}
				/>
				<div className={classes.buttonList}>
					<Fab
						className={classes.button}
						aria-label='Add'
						size='large'
					>
						<AddIcon />
					</Fab>
					<Fab
						className={classes.button}
						aria-label='Mic'
						size='large'
					>
						<MicIcon />
					</Fab>
					<Fab
						className={classes.button}
						aria-label='Volume on'
						size='large'
					>
						<VolumeOnIcon />
					</Fab>
					<Fab
						color='secondary'
						className={classes.button}
						aria-label='Hang up'
						size='large'
						onClick={() => sipCaller.terminate(session.sipSession)}
					>
						<CallEndIcon />
					</Fab>
				</div>
			</div>
		);
	}
	else
	{
		return null;
	}
};

SessionView.propTypes =
{
	sipCaller : PropTypes.object.isRequired,
	session   : PropTypes.object
};

const mapStateToProps = (state) =>
	({
		session : state.sessions[state.userStatus.currentSession]
	});

export default withSipCallerContext(
	connect(mapStateToProps, null)(withStyles(styles)(SessionView))
);