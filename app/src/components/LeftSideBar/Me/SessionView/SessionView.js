import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MediaView from './MediaView/MediaView';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
	paper : {
		padding : theme.spacing.unit * 2
	}
});

const SessionView = (props) =>
{
	const {
		session,
		classes
	} = props;

	return (
		<Paper className={ classes.paper }>
			{ session && session.localStream ?
				<MediaView
					mediaStream={ session.localStream }
				/>
				:null
			}
		</Paper>
	);
};

SessionView.propTypes =
{
	session : PropTypes.object,
	classes : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
({
	session : state.sessions[state.userStatus.currentSession]
});

export default connect(mapStateToProps, null)(withStyles(styles)(SessionView));