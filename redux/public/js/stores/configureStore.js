/**
 * With Redux, there is only a SINGLE STORE. Properties and mutations of the
 * store are managed by reducers. This file sets up the store, and hydrates
 * the store with reducers.
 *
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // needed for async actions
import reducer from '../reducers';


// Redux middleware for console.logging actions
import createLogger from 'redux-logger'

// ADD a simple flag to turn on / off...
const DEV_MODE = process.env.NODE_ENV !== 'production'
const logger = createLogger({
	level: 'info',
	collapsed: true,
	predicate: (getState, action) => DEV_MODE // hide in prodction
})

// create a store, and apply middleware
const store = createStore(
	reducer,
	applyMiddleware(thunk, logger)
);

export default store;
