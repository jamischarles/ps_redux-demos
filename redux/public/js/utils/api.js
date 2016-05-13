/**
 * This file isn't strictly necessary but can be a really nice way of separating ajax calls out.
 * Any data massaging before or after a call could happen here.
 * I like to use fetch() here, but wanted to keep this example really simple.
 */
// we could easily use something other than jquery here
import $ from 'jquery';


export function getConversionRate(payload, callback) {
	var url = '/api/conversion';

	$.ajax({
	    method: 'GET',
	    url: url,
	    data: payload
	})
	.done(callback);
}

export function getFees(payload, callback) {
    var url = '/api/fees';

    $.ajax({
	method: 'GET',
	url: url,
	data: payload
    })
    .done(callback);
}
