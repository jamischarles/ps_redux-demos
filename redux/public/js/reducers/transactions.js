/**
 * Transaction reducer. Contains most of the relevant info for the moveMoney transaction, minus fees.
 */

import { ActionTypes as types } from '../Constants'

// set initialState. This obj is used the first time only. After that it is cloned in the reducer below.
const initialState = {
	originAmount: '0',
	originCurrency: 'USD',
	destAmount: '0',
	destCurrency: 'EUR',
	feeAmount: 0,
	conversionRate: 1.50,
	totalCost: 0
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
				...state, // ES7 obj spread. Same as Object.assign({}, state, originAmount, originCurrency)
				originAmount: action.data.fromAmount,
				originCurrency: action.data.fromCurrencyCode
			}
			/* same example without fancy ES7 object spread
			return Object.assign({}, state, {
				originAmount: action.data.fromAmount,
				originCurrency: action.data.fromCurrencyCode
			})
			*/
		case types.CHANGE_DESTINATION_AMOUNT:
			return {
				...state,
				destAmount: action.data.toAmount,
				destCurrencyCode: action.data.toCurrencyCode
			}

		case types.CHANGE_ORIGIN_CURRENCY:
			return {
				...state,
				originCurrency: action.data.fromCurrencyCode
			}
		case types.CHANGE_DESTINATION_CURRENCY:
			return {
				...state,
				destCurrency: action.data.toCurrencyCode
			}

		case types.RECEIVED_CONVERSION_RATE:
			return {
				...state,
				conversionRate: action.data.xRate,
				originAmount: action.data.originAmount,
				destAmount: action.data.destAmount
			}

		case types.RECEIVED_FEES:
			return {
				...state,
				feeAmount: action.data.feeAmount,
				// FIXME: consider putting this in a separate util... (for testing, etc...)
				// This is usually more computation than I like to have in a reducer
				totalCost: parseFloat(action.data.originAmount, 10) + parseFloat(action.data.feeAmount, 10)
			}

		default:
			return state
	}
}
