/**
 * Contains all of the actions that can happen in the App.
 */

import keyMirror from 'keymirror';

// keyMirror isn't strictly needed. It's sugar to have key & value be the same.
// ie: CHANGE_AMOUNT: 'CHANGE_AMOUNT'
//
// FIXME: Explain why actions are helpful...
export const ActionTypes = keyMirror({

	CHANGE_ORIGIN_AMOUNT: null,
	REQUEST_CONVERSION_RATE: null,
	RECEIVED_CONVERSION_RATE: null,
})



// FIXME: Prolly delete this...
// Some people like to split up server actions vs UI actions. You could
// separate them in different files, or by source like this
export const PayloadSources = {
	SERVER_ACTION: 'SERVER_ACTION',
	VIEW_ACTION: 'VIEW_ACTION'
}
