/**
 * Reducers are the pure functions (no side effects!) that update the store. Each reducer updates it's part of the (single) store.
 * Each reducer contains properties and exposes a pure function that will update the relevant part of the store.
 * Combines all the reducers so they can be exposed as one data structure.
 *
 */
import { combineReducers } from 'redux';
import transactions from './transactions';
import currencyList from './currencyList';

let rootReducer = combineReducers({
	transactions: transactions,
	currencyList: currencyList
})

export default rootReducer
