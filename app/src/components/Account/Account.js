import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSipCallerContext } from '../../sipCallerContext';
import { withStyles } from '@material-ui/core/styles';
import * as stateActions from '../../actions/stateActions';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = (theme) =>
	({
		paper :
		{
			padding : theme.spacing.unit * 2,
			width   : '20vw'
		}
	});

const Account = (props) =>
{
	const {
		sipCaller,
		displayName,
		sipUri,
		password,
		outboundProxy,
		autoRegister,
		setDisplayName,
		setSipUri,
		setPassword,
		setOutboundProxy,
		setAutoRegister,
		registered,
		classes
	} = props;

	return (
		<Paper className={classes.paper}>
			{ !registered ?
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<TextField
							id='displayname'
							label='Displayname'
							value={displayName || ''}
							style={{ width: '100%' }}
							onChange={(event) => setDisplayName(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='sipuri'
							label='SIP URI'
							type='email'
							value={sipUri || ''}
							style={{ width: '100%' }}
							onChange={(event) => setSipUri(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='password'
							label='Password'
							type='password'
							value={password || ''}
							style={{ width: '100%' }}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='outboundproxy'
							label='Outbound Proxy'
							value={outboundProxy || ''}
							style={{ width: '100%' }}
							onChange={(event) => setOutboundProxy(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									checked={autoRegister}
									onChange={() => setAutoRegister(!autoRegister)}
								/>
							}
							label='Autoregister'
						/>
						
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='primary'
							onClick={() => sipCaller.register()}
						>
							Register
						</Button>
					</Grid>
				</Grid>
				:<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant='body1' noWrap>
							{ displayName }
						</Typography>
						<Typography noWrap>
							{ sipUri }
						</Typography>
						<Typography variant='caption' noWrap>
							Registered
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => sipCaller.unRegister()}
						>
							Unregister
						</Button>
					</Grid>
				</Grid>
			}
		</Paper>
	);
};

Account.propTypes =
{
	sipCaller        : PropTypes.any.isRequired,
	displayName      : PropTypes.string,
	sipUri           : PropTypes.string,
	password         : PropTypes.string,
	outboundProxy    : PropTypes.string,
	autoRegister     : PropTypes.bool,
	setDisplayName   : PropTypes.func.isRequired,
	setSipUri        : PropTypes.func.isRequired,
	setPassword      : PropTypes.func.isRequired,
	setOutboundProxy : PropTypes.func.isRequired,
	setAutoRegister  : PropTypes.func.isRequired,
	registered       : PropTypes.bool.isRequired,
	classes          : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		displayName   : state.user.displayName,
		sipUri        : state.user.sipUri,
		password      : state.user.password,
		outboundProxy : state.user.outboundProxy,
		autoRegister  : state.user.autoRegister,
		registered    : state.userStatus.registered
	});

const mapDispatchToProps = (dispatch) =>
	({
		setDisplayName : (displayName) => dispatch(
			stateActions.setDisplayName({ displayName })),
		setSipUri : (sipUri) => dispatch(
			stateActions.setSipUri({ sipUri })),
		setPassword : (password) => dispatch(
			stateActions.setPassword({ password })),
		setOutboundProxy : (outboundProxy) => dispatch(
			stateActions.setOutboundProxy({ outboundProxy })),
		setAutoRegister : (autoRegister) => dispatch(
			stateActions.setAutoRegister({ autoRegister }))
	});

export default withSipCallerContext(
	connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
);
