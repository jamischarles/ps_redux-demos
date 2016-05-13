import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import * as actions from '../actions/actions';

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
    componentDidMount() {
        // Add debounced versions of _getConversionRate() and getFees() so we avoid server & UI Thrashing.
        // See http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/28046731#28046731

        this.getConversionRate = debounce(this._getConversionRate, 350);
        this.getFees = debounce(this._getFees, 350);

        this.refs.originAmountInput.focus();
    },
    handleCurrencyChange(currentlyEditing, event) {
        if (currentlyEditing === 'origin') {
            this.props.dispatch(actions.changeOriginCurrency(event.target.value));
        } else {
            this.props.dispatch(actions.changeDestCurrency(event.target.value));
        }

        // re-fetch the conversion rate and fees fees
        this.getConversionRate({originAmount: this.props.originAmount, destAmount: this.props.destAmount, calcOriginAmount: false});
        this.getFees({originAmount: this.props.originAmount});

    },
    handleOriginAmountChange(event) {
        // remove unallowed chars
        var newAmount = event.target.value.replace(',','');

        // send change action so the input will update as you type
        this.props.dispatch(actions.changeOriginAmount(newAmount, this.props.originCurrency));


        this.getConversionRate({originAmount: newAmount, destAmount: this.props.destAmount, calcOriginAmount: false});
        this.getFees({originAmount: newAmount});
    },

    handleDestAmountChange(event) {
        var that = this;

        // remove unallowed chars
        var newAmount = event.target.value.replace(',','')

        // optimistic update
        this.props.dispatch(actions.changeDestAmount(newAmount, this.props.destinationCurrency));

        // FIXME: consider nesting these in the api file, or in the actions...
        // We need to calc the originAmount first, since fees need the originAmount to calc the fees properly
        this.getConversionRate({originAmount: this.props.originAmount, destAmount: newAmount, calcOriginAmount: true}, function(err, resp){
            that.getFees({originAmount: resp.originAmount});
        });
    },
    // debounced in componentDidMount
    _getConversionRate(data, callback) {
        var payload = {
            originAmount: data.originAmount,
            calcOriginAmount: data.calcOriginAmount,
            destAmount: data.destAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
        }
        this.props.dispatch(actions.fetchConversionRate(payload, callback));
    },
    // debounced in componentDidMount
    _getFees(data) {
        var payload = {
            originAmount: data.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
        }
        this.props.dispatch(actions.fetchFees(payload, this.props.originCurrency));
    },

    render(){
        var { originAmount, destinationAmount, originCurrency, destinationCurrency, conversionRate, feeAmount, totalCost } = this.props;

        var currencyList = this.props.currencyList.map(function(item){
            return <option key={item} value={item}>{item}</option>
        });

        return (
          <div>
            <label>Convert</label>&nbsp;
            <input ref="originAmountInput" onChange={this.handleOriginAmountChange} defaultValue={originAmount} value={originAmount} />
            <select ref="originCurrency" value={originCurrency} onChange={this.handleCurrencyChange.bind(null, 'origin')}>
                {currencyList}
            </select>
            to <input onChange={this.handleDestAmountChange} value={destinationAmount} />&nbsp;
            <select ref="destCurrency" value={destinationCurrency} onChange={this.handleCurrencyChange.bind(null, 'destination')}>
                {currencyList}
            </select>


            <br/><br/><br/>
            <FeesTable
                originCurrency={originCurrency}
                destinationCurrency={destinationCurrency}
                conversionRate={conversionRate}
                fee={feeAmount}
                total={totalCost}
                />
          </div>
        )
    }
});

/**
 * This is how components subscribe to Redux state. By connecting to redux like this:
 * 1) The keys below are assigned at this.props.* for the given component that's the argument
 * on the last line.
 * 2) Any time these properties in redux change, they are passed down to the components, which
 * are then re-rendered with the new props.
 */
export default connect(function(state) {
    return {
        // this.props.originAmount is now subscribed to redux state changes for that propethese are rty.
        originAmount: state.transactions.originAmount,
        destinationAmount: state.transactions.destAmount,
        originCurrency: state.transactions.originCurrency,
        destinationCurrency: state.transactions.destCurrency,
        feeAmount: state.transactions.feeAmount,
        conversionRate: state.transactions.conversionRate,
        totalCost: state.transactions.totalCost,
        currencyList: state.currencyList
    }
})(Conversion);
