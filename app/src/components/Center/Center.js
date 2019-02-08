import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialer from './Dialer/Dialer';
import SessionView from './SessionView/SessionView';

const styles = theme => ({
	paper : {
		padding : theme.spacing.unit * 2
	}
});

const Center = (props) =>
{
	const {
		registered,
		classes
	} = props;

	return (
		<Grid container spacing={ 8 }>
			<Grid item xs={ 12 }>
				<Paper className={ classes.paper }>
					{ registered ?
						<Dialer />
						:null
					}
				</Paper>
			</Grid>
			<Grid item xs={ 12 }>
				<Paper className={ classes.paper }>
					<SessionView />
				</Paper>
			</Grid>
		</Grid>
	);
};

Center.propTypes =
{
	registered : PropTypes.bool.isRequired,
	classes    : PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	registered : state.userStatus.registered,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Center));
