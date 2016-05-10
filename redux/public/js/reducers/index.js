/**
 * Reducers are the pure functions (no side effects!) that update the store. Each reducer updates it's part of the (single) store.
 * Each reducer contains properties and exposes a pure function that will update the relevant part of the store.
 * Combines all the reducers so they can be exposed as one data structure.
 *
 */
import { combineReducers } from 'redux'
// import currencyCodes from './currencyCodes'
// import fees from './fees'
// import loading from './loading'
// import countries from './countries'
// import contacts from './contacts'
// import errors from './errors'
import transactions from './transactions'
// import user from './user'
// import userActions from './userActions'
// import { routeReducer as routing } from 'redux-simple-router'

let rootReducer = combineReducers({
	// routing,
	// errors,
	// countries,
	// contacts,
	// currencyCodes,
	// fees,
	// loading,
	transactions
	// user,
	// userActions,
})

export default rootReducer
