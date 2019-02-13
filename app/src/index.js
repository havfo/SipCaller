import domready from 'domready';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import { SnackbarProvider } from 'notistack';
import debug from 'debug';
import Logger from './logger';
import SipCallerContext from './sipCallerContext';

import './index.css';
import App from './components/App';
import LoadingView from './components/LoadingView';

import * as serviceWorker from './serviceWorker';
import SipCaller from './sipCaller';

if (process.env.NODE_ENV !== 'production')
{
	debug.enable('sipcaller:*');
}

const logger = new Logger();

let sipCaller;

SipCaller.init({ store });

domready(() =>
{
	logger.debug('DOM ready');

	run();
});

function run()
{
	logger.debug('run() [environment:%s]', process.env.NODE_ENV);

	sipCaller = new SipCaller();
	global.sipCaller = sipCaller;

	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={<LoadingView />} persistor={persistor}>
				<SipCallerContext.Provider value={sipCaller}>
					<SnackbarProvider>
						<App />
					</SnackbarProvider>
				</SipCallerContext.Provider>
			</PersistGate>
		</Provider>,
		document.getElementById('sipcaller')
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
