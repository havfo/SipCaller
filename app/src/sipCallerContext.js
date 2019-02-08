import React from 'react';

const SipCallerContext = React.createContext();

export default SipCallerContext;

export function withSipCallerContext(Component)
{
	return (props) =>
	( // eslint-disable-line react/display-name
		<SipCallerContext.Consumer>
			{(sipCaller) => <Component {...props} sipCaller={sipCaller} />}
		</SipCallerContext.Consumer>
	);
};