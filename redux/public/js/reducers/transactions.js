/**
 * Transaction reducer. Contains most of the relevant info for the moveMoney transaction, minus fees.
 */

import { ActionTypes as types } from '../Constants'

// set initialState. This obj is used the first time only. After that it is cloned in the reducer below.
const initialState = {
	originAmount: '0',
	originCurrencyCode: '',
	destAmount: '0',
	destCurrencyCode: ''
}

/**
 * Reducer function. This is a pure function (no side effects).
 * It makes state changes based on the action passed in, and then returns a new obj
 * with those mutations applied.
 */
export default function transaction(state = initialState, action) {

	switch (action.type) {

		case types.CHANGE_ORIGIN_AMOUNT:
			return {
				...state, // ES7 obj spread. Same as Object.assign({}, state, fromCountry, fromCurrencyCode)
				originAmount: action.data.fromAmount,
				originCurrencyCode: action.data.fromCurrencyCode
			}
			/* same example without fancy ES7 object spread
			return Object.assign({}, state, {
				originAmount: action.data.fromAmount,
				originCurrencyCode: action.data.fromCurrencyCode
			})
			*/

		case types.RECEIVED_CONVERSION_RATE:
			return {
				...state, // ES7 obj spread. Same as Object.assign({}, state, fromCountry, fromCurrencyCode)
				destAmount: action.data.destAmount,
				destCurrencyCode: action.data.destCurrencyCode
			}

		default:
			return state
	}

}
