import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers/rootReducer';

const persistConfig =
{
	key             : 'root',
	storage         : storage,
	stateReconciler : autoMergeLevel2,
	blacklist       : [ 'sessions', 'userStatus' ]
};

const reduxMiddlewares =
[
	thunk
];

if (process.env.NODE_ENV !== 'production')
{
	const reduxLogger = createLogger(
		{
			duration  : true,
			timestamp : false,
			level     : 'log',
			logErrors : true
		});

	reduxMiddlewares.push(reduxLogger);
}

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	pReducer,
	applyMiddleware(...reduxMiddlewares)
);

export const persistor = persistStore(store);