/**
 * CurrencyList reducer. Contains a list of currencyCodes we can send to.
 */

import { ActionTypes as types } from '../Constants'

// set initialState. This obj is used the first time only. After that it is cloned in the reducer below.
// Normally we'd be fetching this from the server... 
const initialState = ['USD', 'EUR', 'JPY'];

/**
 * Reducer function. This is a pure function (no side effects).
 * It makes state changes based on the action passed in, and then returns a new obj
 * with those mutations applied.
 */
export default function currencyList(state = initialState, action) {

	switch (action.type) {
		default:
			return state
	}

}
