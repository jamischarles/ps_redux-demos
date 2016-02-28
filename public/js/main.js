import React from 'react';
import ReactDOM from 'react-dom';

import Conversion from './components/conversion.js';


// constant placeholders until we replace with server data...
var conversionRate = 1.5;
var fee = 2.50;
var total = 16.50;

var MainComponent = React.createClass({
  render() {
    return (
      <div>
        <Conversion conversionRate={conversionRate} fee={fee} total={total} />
      </div>
    )
  }
});


ReactDOM.render(<MainComponent />, document.getElementById('container'));
