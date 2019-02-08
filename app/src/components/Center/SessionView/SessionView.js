import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaView from './MediaView/MediaView';

const SessionView = (props) =>
{
	const {
		session
	} = props;

	return (
		<div className='SessionView'>
			{ session ?
				session.sipSession.remoteIdentity.friendlyName
				:null
			}
			{ session && session.remoteStream ?
				<MediaView
					mediaStream={ session.remoteStream }
				/>
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

export default connect(mapStateToProps, null)(SessionView);