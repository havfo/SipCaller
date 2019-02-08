import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSipCallerContext } from '../../../sipCallerContext';
import {
	setDisplayName,
	setSipUri,
	setPassword,
	setOutboundProxy,
	setAutoRegister
} from '../../../actions/stateActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Login = (props) =>
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
		setAutoRegister
	} = props;

	return (
		<Grid container spacing={ 8 }>
			<Grid item xs={ 3 }>
				<TextField
					id='displayname'
					label='Displayname'
					value={ displayName || '' }
					style ={{ width: '100%' }}
					onChange =
					{
						(e) =>
						{
							setDisplayName(e.target.value);
						}
					}
				/>
			</Grid>
			<Grid item xs={ 3 }>
				<TextField
					id='sipuri'
					label='SIP URI'
					type='email'
					value={ sipUri || '' }
					style ={{ width: '100%' }}
					onChange =
					{
						(e) =>
						{
							setSipUri(e.target.value);
						}
					}
				/>
			</Grid>
			<Grid item xs={ 3 }>
				<TextField
					id='password'
					label='Password'
					type='password'
					value={ password || '' }
					style ={{ width: '100%' }}
					onChange =
					{
						(e) =>
						{
							setPassword(e.target.value);
						}
					}
				/>
			</Grid>
			<Grid item xs={ 3 }>
				<TextField
					id='outboundproxy'
					label='Outbound Proxy'
					value={ outboundProxy || '' }
					style ={{ width: '100%' }}
					onChange =
					{
						(e) =>
						{
							setOutboundProxy(e.target.value);
						}
					}
				/>
			</Grid>
			<Grid item xs={ 2 }>
				<FormControlLabel
					control={
						<Checkbox
							checked={ autoRegister }
							onChange={
								() =>
								{
									setAutoRegister(!autoRegister);
								}
							}
						/>
					}
					label='Autoregister'
				/>
				
			</Grid>
			<Grid item xs={ 2 }>
				<Button
					variant='contained'
					color='primary'
					onClick=
					{
						(e) =>
						{
							sipCaller.register();
						}
					}
				>
					Register
				</Button>
			</Grid>
		</Grid>
	);
};

Login.propTypes =
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
	setAutoRegister  : PropTypes.func.isRequired
};

const mapStateToProps = state =>
({
	displayName   : state.user.displayName,
	sipUri        : state.user.sipUri,
	password      : state.user.password,
	outboundProxy : state.user.outboundProxy,
	autoRegister  : state.user.autoRegister
});

const mapDispatchToProps = dispatch =>
({
	setDisplayName : (displayName) =>
		dispatch(setDisplayName({ displayName } )),
	setSipUri : (sipUri) =>
		dispatch(setSipUri({ sipUri })),
	setPassword : (password) =>
		dispatch(setPassword({ password })),
	setOutboundProxy : (outboundProxy) =>
		dispatch(setOutboundProxy({ outboundProxy })),
	setAutoRegister : (autoRegister) =>
		dispatch(setAutoRegister({ autoRegister }))
});

export default withSipCallerContext(
	connect(mapStateToProps, mapDispatchToProps)(Login)
);
