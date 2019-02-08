import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSipCallerContext } from '../../../../sipCallerContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
	paper : {
		padding : theme.spacing.unit * 2
	}
});

const Info = (props) =>
{
	const {
		sipCaller,
		user,
		userStatus,
		classes
	} = props;

	return (
		<Paper className={ classes.paper }>
			<Grid container wrap='nowrap' spacing={16}>
				<Grid item xs zeroMinWidth>
					<Typography variant='body1' noWrap>
						{ user.displayName }
					</Typography>
					<Typography noWrap>
						{ user.sipUri }
					</Typography>
					<Typography variant='caption' noWrap>
						{ userStatus.registered ? 'Registered' : 'Not registered' }
					</Typography>
				</Grid>
				<Grid item>
					{ userStatus.registered ?
						<IconButton
							className={ classes.button }
							aria-label='Unregister'
							onClick=
							{
								() =>
								{
									sipCaller.unRegister();
								}
							}
						>
							<ExitIcon />
						</IconButton>
						:null
					}
				</Grid>
			</Grid>
		</Paper>
	);
};

Info.propTypes =
{
	sipCaller  : PropTypes.object.isRequired,
	user       : PropTypes.object.isRequired,
	userStatus : PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	user       : state.user,
	userStatus : state.userStatus
});

export default withSipCallerContext(
	connect(mapStateToProps, null)(withStyles(styles)(Info))
);
