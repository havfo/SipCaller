import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSipCallerContext } from '../../sipCallerContext';
import { withStyles } from '@material-ui/core/styles';
import * as stateActions from '../../actions/stateActions';
import * as sessionStates from '../../sessionStates';
import MediaView from './MediaView/MediaView';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TransferIcon from '@material-ui/icons/CallSplit';
import VideoIcon from '@material-ui/icons/Videocam';
import VideoOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import AudioIcon from '@material-ui/icons/VolumeUp';
import AudioOffIcon from '@material-ui/icons/VolumeOff';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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

class SessionView extends Component
{
	state =
	{
		open : false
	};
	
	handleClickOpen = () =>
	{
		this.setState({ open: true });
	};
	
	handleClose = () =>
	{
		this.setState({ open: false });
	};

	handleTransfer = () =>
	{
		this.handleClose();

		const {
			sipCaller,
			session,
			transferUri
		} = this.props;

		sipCaller.refer(session.sipSession, transferUri);
	}

	render()
	{
		const {
			sipCaller,
			session,
			transferUri,
			setTransferUri,
			classes
		} = this.props;

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
					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby='form-dialog-title'
					>
						<DialogTitle id='form-dialog-title'>Transfer session</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To transfer this session, type the SIP URI you want to
								transfer to below.
							</DialogContentText>
							<TextField
								autoFocus
								margin='dense'
								id='sipUri'
								label='SIP URI'
								type='email'
								value={transferUri || ''}
								onChange={(event) => setTransferUri(event.target.value)}
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color='primary'>
								Cancel
							</Button>
							<Button onClick={this.handleTransfer} color='primary'>
								Transfer
							</Button>
						</DialogActions>
					</Dialog>
					<div className={classes.buttonList}>
						<Fab
							className={classes.button}
							aria-label='Audio on/off'
							size='large'
							onClick={() => sipCaller.toggleMedia(session.sipSession, 'audio', !session.remoteAudioMuted)}
						>
							{ session.remoteAudioMuted ?
								<AudioOffIcon />
								:
								<AudioIcon />
							}
						</Fab>
						<Fab
							className={classes.button}
							aria-label='Video on/off'
							size='large'
							onClick={() => sipCaller.toggleMedia(session.sipSession, 'video', !session.remoteVideoMuted)}
						>
							{ session.remoteVideoMuted ?
								<VideoOffIcon />
								:
								<VideoIcon />
							}
						</Fab>
						<Fab
							className={classes.button}
							aria-label='Video on/off'
							size='large'
							onClick={this.handleClickOpen}
						>
							<TransferIcon />
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
	}
}

SessionView.propTypes =
{
	sipCaller      : PropTypes.object.isRequired,
	session        : PropTypes.object,
	transferUri    : PropTypes.string,
	setTransferUri : PropTypes.func.isRequired,
	classes        : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		session     : state.sessions[state.userStatus.currentSession],
		transferUri : state.user.transferUri
	});

const mapDispatchToProps = (dispatch) =>
	({
		setTransferUri : (transferUri) => dispatch(
			stateActions.setTransferUri({ transferUri }))
	});

export default withSipCallerContext(
	connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SessionView))
);