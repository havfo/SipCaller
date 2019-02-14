import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSipCallerContext } from '../../sipCallerContext';
import { withStyles } from '@material-ui/core/styles';
import * as stateActions from '../../actions/stateActions';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import CallIcon from '@material-ui/icons/Call';

const styles = (theme) =>
	({
		grid :
		{
			width : '50vw'
		},
		call :
		{
			position        : 'relative',
			borderRadius    : theme.shape.borderRadius,
			backgroundColor : fade(theme.palette.common.white, 0.15),
			'&:hover'       : {
				backgroundColor : fade(theme.palette.common.white, 0.25)
			},
			// marginRight                  : theme.spacing.unit * 2,
			marginLeft                   : 0,
			width                        : '100%',
			[theme.breakpoints.up('sm')] : {
				marginLeft : theme.spacing.unit * 3,
				width      : 'auto'
			}
		},
		callIcon :
		{
			width          : theme.spacing.unit * 5,
			height         : '100%',
			position       : 'absolute',
			pointerEvents  : 'none',
			display        : 'flex',
			alignItems     : 'center',
			justifyContent : 'center'
		},
		inputRoot :
		{
			color : 'inherit',
			width : '100%'
		},
		inputInput :
		{
			paddingTop                   : theme.spacing.unit,
			paddingRight                 : theme.spacing.unit,
			paddingBottom                : theme.spacing.unit,
			paddingLeft                  : theme.spacing.unit * 5,
			transition                   : theme.transitions.create('width'),
			width                        : '100%',
			[theme.breakpoints.up('md')] : {
				width : '100%'
			}
		}
	});

const Dialer = (props) =>
{
	const {
		sipCaller,
		requestUri,
		registered,
		setRequestUri,
		classes
	} = props;

	return (
		<Grid className={classes.grid} container spacing={8}>
			<Grid item xs={9}>
				<div className={classes.call}>
					<div className={classes.callIcon}>
						<CallIcon />
					</div>
					<InputBase
						placeholder='SIP URI'
						classes={{
							root  : classes.inputRoot,
							input : classes.inputInput
						}}
						value={requestUri || ''}
						onChange={(event) => setRequestUri(event.target.value)}
						onKeyPress={(ev) =>
						{
							if (ev.key === 'Enter')
							{
								ev.preventDefault();

								sipCaller.invite(requestUri);
							}
						}}
						autoFocus
					/>
				</div>
			</Grid>
			<Grid item xs={3}>
				<Button
					variant='contained'
					color='primary'
					disabled={!registered}
					onClick={() => sipCaller.invite(requestUri)}
				>
					Call
				</Button>
			</Grid>
		</Grid>
	);
};

Dialer.propTypes =
{
	sipCaller     : PropTypes.any.isRequired,
	requestUri    : PropTypes.string,
	registered    : PropTypes.bool.isRequired,
	setRequestUri : PropTypes.func.isRequired,
	classes       : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		requestUri : state.user.requestUri,
		registered : state.userStatus.registered
	});

const mapDispatchToProps = (dispatch) =>
	({
		setRequestUri : (requestUri) => dispatch(
			stateActions.setRequestUri({ requestUri }))
	});

export default withSipCallerContext(
	connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dialer))
);
