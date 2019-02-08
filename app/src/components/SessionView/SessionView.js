import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaView from './MediaView/MediaView';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import VolumeOn from '@material-ui/icons/VolumeUp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';

const styles = theme => ({
	fab: 
	{
		margin: theme.spacing.unit,
		position: 'relative',
	},
	extendedIcon: 
	{
	  	marginRight: theme.spacing.unit,
	},
	sessionAll:
	{
		position: 'relative',
		width: '100%',
	},
	buttonList:
	{
		position: 'absolute',
		bottom: 0,
		transform: 'translate(-50%, -50%)',
		left: '50%',
	},
	sessionWrapper:
	{
		textAlign: 'center',
		width: '100%',
		height: '100%',
	},
	selfViewButton:
	{
		
	},
	sessionView:
	{
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		zIndex: -1,
	}
  });
  
const SessionView = (props) =>
{
	const {
		session,
		classes
	} = props;

	return (
		<div className={classes.sessionView}>
			{ session ?
				session.sipSession.remoteIdentity.friendlyName
				:null
			}
			{ session && session.remoteStream ?
				<div className={classes.sessionWrapper}>
					<MediaView
						mediaStream={ session.remoteStream }
					/>
					<div className={classes.sessionAll}>
						<div className={classes.buttonList}>
							<Fab position='static' color='primary' aria-label='Add' className={classes.fab}>
								<AddIcon />
							</Fab>
							<Fab aria-label="Mic" className={classes.fab}>
								<MicIcon />
							</Fab>
							<Fab aria-label="Volume on" className={classes.fab}>
								<VolumeOn className={classes.fab} />
							</Fab>
							<Fab color="secondary" aria-label="Hand up" className={classes.fab}>
								<CallEndIcon />
							</Fab>				
						</div>
					</div>
				</div>	
			:null
			}
		</div>
	);
};

SessionView.propTypes =
{
	session : PropTypes.object
};

const mapStateToProps = (state) =>
({
	session : state.sessions[state.userStatus.currentSession]
});

export default connect(mapStateToProps, null)(withStyles(styles)(SessionView));