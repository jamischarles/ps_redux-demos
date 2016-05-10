import $ from 'jquery';


export function getConversionRate(payload, callback) {
	var url = '/api/conversion';


	// var originCurrency = this.state.originCurrency;
	// var destCurrency = this.state.destinationCurrency;
    //
	// var payload = {
	// 	originAmount: data.newValue || this.props.originAmount,
	// 	destAmount: data.newValue || this.state.destAmount,
	// 	originCurrency: originCurrency,
	// 	destCurrency: destCurrency,
	// 	calcOriginAmount: false
	// }

	// determine whether we need to calc origin or dest amount
	// if (data.currentlyEditing === 'dest') {
	// 	payload.calcOriginAmount = true
	// }

	// ajax call for destination amount
	// originCurrency, destCurrency, originAmount
	$.ajax({
		method: 'GET',
		url: url,
		data: payload
	})
	.done(callback)

}
