import React, {PropTypes} from 'react';
import $ from 'jquery';

var FeesTable = React.createClass({
    propTypes: {
        conversionRate: PropTypes.number.isRequired,
        originAmount: PropTypes.number.isRequired,

    },
    render() {
        var {conversionRate, fee, total, originAmount} = this.props;

        var conversionValue = conversionRate * originAmount;

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Fee</td>
                            <td>{fee}</td>
                        </tr>
                        <tr>
                            <td>Conversion</td>
                            <td>{conversionValue}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{total}</td>
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
            conversionRate: 1
        }
    },
    handleCurrencyChange(currentlyEditing, event) {
        // console.log('arguments', arguments)
        var obj = {};
        if (currentlyEditing === 'origin') {
            obj.originCurrency = event.target.value
        } else {
            obj.destinationCurrency = event.target.value
        }

        this.setState(obj)
    },
    handleOriginAmountChange(currentlyEditing, event) {
        var newValue = event.target.value;
        var originCurrency = this.state.originCurrency;
        var destCurrency = this.state.destinationCurrency;

        var that = this;

        // Thoughts: Often it seems simpler to bundle all this up in one call on the server
        // but maybe you don't have that luxury...

        var payload = {
            originCurrency: originCurrency,
            destCurrency: destCurrency
        }

        // determine whether we're going from origin or dest amount
        if (currentlyEditing === 'origin') {
            payload.originAmount = newValue;
        } else {
            payload.destAmount = newValue;
        }

        // ajax call for destination amount
        // originCurrency, destCurrency, originAmount
        $.ajax({
            method: 'GET',
            url: '/api/conversion',
            data: payload
        })
        .done(function(resp) {
            // make ajax call to get the fee amount..
            var newState = {
                conversionRate: resp.xRate
            }

            // pull new values from response and from event
            if (currentlyEditing === 'origin') {
                newState.originAmount = newValue;
                newState.destinationAmount = resp.destAmount;
            } else {
                newState.originAmount = resp.originAmount;
                newState.destinationAmount = newValue;
            }

            that.setState(newState)

        });

        //
        // ajax call for fees
        // ajax call for total


    },
    render(){
        var {conversionRate, fee, total} = this.props;

        return (
          <div>
            <label>Convert</label>&nbsp;
            <input onChange={this.handleOriginAmountChange.bind(null, 'origin')} value={this.state.originAmount} />
            <select ref="originCurrency" value={this.state.originCurrency} onChange={this.handleCurrencyChange.bind(null, 'origin')}>
                <option>USD</option>
                <option>EUR</option>
            </select>
            to <input onChange={this.handleOriginAmountChange.bind(null, 'destination')} value={this.state.destinationAmount} />&nbsp;
            <select ref="destCurrency" value={this.state.destinationCurrency} onChange={this.handleCurrencyChange.bind(null, 'destination')}>
                <option>USD</option>
                <option>EUR</option>
            </select>
            <button type="button">Convert</button>


            <br/><br/><br/>
            <FeesTable originAmount={this.state.originAmount} conversionRate={this.state.conversionRate} fee={fee} total={total} />
          </div>
        )
    }
});

export default Conversion;
