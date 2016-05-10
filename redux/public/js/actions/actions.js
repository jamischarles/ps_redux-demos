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
// import { routeTo } from '../lib/routeHelper'
// import { amountToProperCurrencyPrecision } from '../../lib/amountUtils'
// import { shouldFetchNewAmount, cleanRecipientInput } from './utils'
// import serverProps from '../lib/serverProps'
// import invariant from 'invariant'

/**
 * Sets the from country and associated values
 * @param {String} country The 2-digit country code
 */
export function changeOriginAmount(amount, currencyCode) {
	return {
		type: types.CHANGE_ORIGIN_AMOUNT,
		data: {
			fromAmount: amount,
			fromCurrencyCode: currencyCode
		}
	}
}


export function fetchConversionRate(payload) {
	// this is an async thunk, so it returns a function instead of just an object
	return function (dispatch) {
		dispatch(requestConversionRate(payload))


		// ajax call is made here...
		// FIXME: handle error use case in a separate action...
		api.getConversionRate(payload, function(resp) {
			dispatch(receiveConversionRate(resp));
		}); 

	}



        // // get the new dest amount
        // this.makeConversionAjaxCall({
        //     currentlyEditing: 'origin',
        //     newValue: newAmount
        //
        // }, function(resp){
        //     that.setState({
        //         conversionRate: resp.xRate,
        //         destinationAmount: resp.destAmount
        //     })
        // });
}

export function requestConversionRate(payload) {
	return {
		type: types.REQUEST_CONVERSION_RATE,
		payload: payload
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





// FIXME: depending on how messy this gets, it could be nice to split this into a utils/api.js file...

// it's nice to seperate actions from ajax call details... 
// you could inline it, if it's simple, and we do sometimes by using fetch()
// but separating can make it simpler...


