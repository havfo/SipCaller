import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withSipCallerContext } from '../../../sipCallerContext';
import {
	setRequestUri
} from '../../../actions/stateActions';

const Dialer = (props) =>
{
	const {
		sipCaller,
		requestUri,
		setRequestUri
	} = props;

	return (
		<div className='Dialer'>
			<TextField
				autoFocus
				margin='dense'
				id='SIP-URI'
				label='SIP URI'
				type='email'
				fullWidth
				value={ requestUri || '' }
				onChange=
				{
					(e) =>
					{
						setRequestUri(e.target.value);
					}
				}
			/>
			<Button
				variant='contained'
				color='primary' 
				onClick =
				{
					() =>
					{
						sipCaller.invite(requestUri);
					}
				}
			>
				Call
			</Button>
		</div>
	);
};

Dialer.propTypes =
{
	sipCaller     : PropTypes.any.isRequired,
	requestUri    : PropTypes.string,
	setRequestUri : PropTypes.func.isRequired
};

const mapStateToProps = state =>
({
	requestUri : state.user.requestUri
});

const mapDispatchToProps = dispatch =>
({
	setRequestUri : (requestUri) => dispatch(setRequestUri({ requestUri}))
});

export default withSipCallerContext(
	connect(mapStateToProps, mapDispatchToProps)(Dialer)
);

