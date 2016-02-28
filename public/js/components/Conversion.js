import React, {PropTypes} from 'react';

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
            destinationAmount: '0.00'
        }
    },
    handleOriginAmountChange(event) {
        var originAmount = event.target.value;

        this.setState({
            originAmount: originAmount,
            destinationAmount: this.props.conversionRate * originAmount
        })
    },
    render(){
        var {conversionRate, fee, total} = this.props;

        return (
          <div>
            <label>Convert</label>&nbsp;
            <input onChange={this.handleOriginAmountChange} value={this.state.originAmount} />
            <select>
                <option>USD</option>
                <option>EUR</option>
            </select>
            to <input value={this.state.destinationAmount} />&nbsp;
            <select>
                <option>USD</option>
                <option>EUR</option>
            </select>
            <button type="button">Convert</button>


            <br/><br/><br/>
            <FeesTable originAmount={this.state.originAmount} conversionRate={conversionRate} fee={fee} total={total} />
          </div>
        )
    }
});

export default Conversion;
