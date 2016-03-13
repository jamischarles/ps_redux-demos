import React from 'react';
import ReactDOM from 'react-dom';

import Conversion from './components/conversion.js';

var total = 16.50;

var MainComponent = React.createClass({
  render() {
    return (
      <div>
        <Conversion />
      </div>
    )
  }
});


ReactDOM.render(<MainComponent />, document.getElementById('container'));
