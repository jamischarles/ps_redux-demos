/**
 * Contains all of the actions that can happen in the App.
 */

import keyMirror from 'keymirror';

// keyMirror isn't strictly needed. It's sugar to have key & value be the same.
// ie: CHANGE_AMOUNT: 'CHANGE_AMOUNT'
//
// Actions are extremely helpful to have very consistent action names throughout the app.
export const ActionTypes = keyMirror({

	// UI input action changes
	CHANGE_ORIGIN_AMOUNT: null,
	CHANGE_ORIGIN_CURRENCY: null,

	CHANGE_DESTINATION_AMOUNT: null,
	CHANGE_DESTINATION_CURRENCY: null,

	// AJAX Send/Response actions.
	REQUEST_CONVERSION_RATE: null,
	RECEIVED_CONVERSION_RATE: null,

	REQUEST_FEES: null,
	RECEIVED_FEES: null,
})
