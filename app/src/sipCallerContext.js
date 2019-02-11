import React from 'react';

const SipCallerContext = React.createContext();

export default SipCallerContext;

export const withSipCallerContext = (Component) =>
{
	return (props) =>
		(
			<SipCallerContext.Consumer>
				{(sipCaller) => <Component {...props} sipCaller={sipCaller} />}
			</SipCallerContext.Consumer>
		);
};