import React, {PropTypes} from 'react';
import $ from 'jquery';
import debounce from 'lodash.debounce';

var FeesTable = React.createClass({
    propTypes: {
        conversionRate: PropTypes.number.isRequired,
        originCurrency: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        destinationCurrency: PropTypes.string.isRequired
    },
    render() {
        var {conversionRate, fee, total, originCurrency, destinationCurrency} = this.props;

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Conversion Rate</td>
                            <td>1 {originCurrency} -> {conversionRate.toFixed(2)} {destinationCurrency}</td>
                        </tr>
                        <tr>
                            <td>Fee</td>
                            <td>{fee.toFixed(2)} {originCurrency}</td>
                        </tr>
                        <tr>
                            <td>Total Cost</td>
                            <td>{total.toFixed(2)} {originCurrency}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});

var Conversion = React.createClass({
    getInitialState() {
        return {
            originAmount: '0.00',
            originCurrency: 'USD',
            destinationAmount: '0.00',
            destinationCurrency: 'EUR',
            feeAmount: 0.00,
            conversionRate: 1.5,
            totalCost: 0.00
        }
    },
    componentDidMount() {
        // Add a debounced version of _getDestinationAmount() so we avoid server & UI Thrashing.
		// See http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/28046731#28046731
        this.makeConversionAjaxCall = debounce(this._makeConversionAjaxCall, 350);
        this.makeFeeAjaxCall = debounce(this._makeFeeAjaxCall, 350);

        this.refs.originAmountInput.focus()
    },
    handleCurrencyChange(currentlyEditing, event) {
        var that = this;

        var obj = {};
        if (currentlyEditing === 'origin') {
            obj.originCurrency = event.target.value
        } else {
            obj.destinationCurrency = event.target.value
        }

        // just change both...
        // we have to use the callback so `this.state` will reflect the proper values
        // when they are called in _makeConversionAjaxCall()
        this.setState(obj, function() {
            // get new dest amount & conversion rates
            that.makeConversionAjaxCall({}, function(resp){
                that.setState({
                    originAmount: resp.originAmount,
                    destinationAmount: resp.destAmount,
                    conversionRate: resp.xRate
                })

                // get the new fee & total amount
                that.makeFeeAjaxCall({
                    originAmount: resp.originAmount,
                    originCurrency: that.state.originCurrency,
                    destCurrency: that.state.destinationCurrency

                }, function(response){
                    that.setState({
                        feeAmount: response.feeAmount
                    })

                    that.calcNewTotal();
                });
            })

        })


    },
    handleOriginAmountChange(event) {
        var that = this;
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',','')

        // optimistic field updates
        this.setState({originAmount: newAmount});

        // get the new dest amount
        this.makeConversionAjaxCall({
            currentlyEditing: 'origin',
            newValue: newAmount

        }, function(resp){
            that.setState({
                conversionRate: resp.xRate,
                destinationAmount: resp.destAmount
            })
        });

        // get the new fee & total amount
        this.makeFeeAjaxCall({
            originAmount: newAmount,
            originCurrency: this.state.originCurrency,
            destCurrency: this.state.destinationCurrency

        }, function(resp){
            that.setState({
                feeAmount: resp.feeAmount
            })

            that.calcNewTotal();
        });


    },
    handleDestAmountChange(event) {
        var that = this;
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',','')
        // optimistic update
        this.setState({destinationAmount: newAmount})

        this.makeConversionAjaxCall({
            currentlyEditing: 'dest',
            newValue: newAmount

        }, function(resp){
            // make ajax call to get the fee amount..
            var newState = {
                conversionRate: resp.xRate,
                originAmount: resp.originAmount
            }

            that.setState(newState)

            // get the new fee & total amount
            that.makeFeeAjaxCall({
                originAmount: resp.originAmount,
                originCurrency: that.state.originCurrency,
                destCurrency: that.state.destinationCurrency

            }, function(resp){
                that.setState({
                    feeAmount: resp.feeAmount
                })

                that.calcNewTotal();
            });
        })

    },
    // this is debounced in `componentDidMount()` as this.makeConversionAjaxCall()
    _makeConversionAjaxCall(data, callback) {
        var originCurrency = this.state.originCurrency;
        var destCurrency = this.state.destinationCurrency;

        var payload = {
            originAmount: data.newValue || this.state.originAmount,
            destAmount: data.newValue || this.state.destAmount,
            originCurrency: originCurrency,
            destCurrency: destCurrency,
            calcOriginAmount: false
        }

        // determine whether we need to calc origin or dest amount
        if (data.currentlyEditing === 'dest') {
            payload.calcOriginAmount = true
        }

        // ajax call for destination amount
        // originCurrency, destCurrency, originAmount
        $.ajax({
            method: 'GET',
            url: '/api/conversion',
            data: payload
        })
        .done(callback)

        //
        // ajax call for fees
        // ajax call for total
    },
    // this is debounced in `componentDidMount()`
    _makeFeeAjaxCall(payload, callback) {
        $.ajax({
            method: 'GET',
            url: '/api/fees',
            data: payload
        })
        .done(callback)
    },
    calcNewTotal() {
        var newTotal = parseFloat(this.state.originAmount, 10) + parseFloat(this.state.feeAmount, 10);
        this.setState({ totalCost: parseFloat(newTotal) });
    },

    render(){
        return (
          <div>
            <label>Convert</label>&nbsp;
            <input ref="originAmountInput" onChange={this.handleOriginAmountChange} value={this.state.originAmount} />
            <select ref="originCurrency" value={this.state.originCurrency} onChange={this.handleCurrencyChange.bind(null, 'origin')}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
            </select>
            to <input onChange={this.handleDestAmountChange} value={this.state.destinationAmount} />&nbsp;
            <select ref="destCurrency" value={this.state.destinationCurrency} onChange={this.handleCurrencyChange.bind(null, 'destination')}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
            </select>


            <br/><br/><br/>
            <FeesTable
                originCurrency={this.state.originCurrency}
                destinationCurrency={this.state.destinationCurrency}
                conversionRate={this.state.conversionRate}
                fee={this.state.feeAmount}
                total={this.state.totalCost}
                />
          </div>
        )
    }
});

export default Conversion;
