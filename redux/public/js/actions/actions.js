/**
 * This file (for now) contains all actions that can be dispatched (store.dispatch({})).
 * These are all the actions that can be dispatched.
 *
 * These actions are called from async actions (in this file) as well as from UI components that
 * are dispatching actions.
 */

// import { fetch } from '../lib/xhr'
import { ActionTypes as types } from '../Constants';
import * as api from '../utils/api';


export function changeOriginAmount(amount, currencyCode) {
	return {
		type: types.CHANGE_ORIGIN_AMOUNT,
		data: {
			fromAmount: amount,
			fromCurrencyCode: currencyCode
		}
	}
}

export function changeDestAmount(amount, currencyCode) {
	return {
		type: types.CHANGE_DESTINATION_AMOUNT,
		data: {
			toAmount: amount,
			toCurrencyCode: currencyCode
		}
	}
}

// FIXME: Should we just combine with the amount change action?
export function changeOriginCurrency(currencyCode) {
	return {
		type: types.CHANGE_ORIGIN_CURRENCY,
		data: {
			fromCurrencyCode: currencyCode
		}
	}
}
export function changeDestCurrency(currencyCode) {
	return {
		type: types.CHANGE_DESTINATION_CURRENCY,
		data: {
			toCurrencyCode: currencyCode
		}
	}
}


export function fetchConversionRate(payload, callback) {
	// this is an async thunk, so it returns a function instead of just an object
	return function (dispatch) {
		dispatch(requestConversionRate(payload))


		// ajax call is made here...
		// FIXME: handle error use case in a separate action...
		api.getConversionRate(payload, function(resp) {
			dispatch(receiveConversionRate(resp));
			if (callback) callback(null, resp);
		});

	}

}

export function requestConversionRate(data) {
	return {
		type: types.REQUEST_CONVERSION_RATE,
		data: data
	}
}

export function receiveConversionRate(json) {
	return {
		type: types.RECEIVED_CONVERSION_RATE,
		data: {
			...json, // { bank: { fee, totalCost }, card... }
			receivedAt: Date.now()
		}
	}
}


export function fetchFees(payload) {
	// this is an async thunk, so it returns a function instead of just an object
	return function (dispatch) {
		dispatch(requestFees(payload))


		// ajax call is made here...
		// FIXME: handle error use case in a separate action...
		api.getFees(payload, function(resp) {
			dispatch(receiveFees(resp));
		});

	}
}


export function requestFees(data) {
	return {
		type: types.REQUEST_FEES,
		data: data
	}
}

export function receiveFees(json) {
	return {
		type: types.RECEIVED_FEES,
		data: {
			...json, // { bank: { fee, totalCost }, card... }
			receivedAt: Date.now()
		}
	}
}
