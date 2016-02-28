import React from 'react';
import ReactDOM from 'react-dom';

import Second from './components/second.js';
import Third from './components/third.js';

var MainComponent = React.createClass({
  render() {
    return (
      <div>
        <Second />
        <Third />
      </div>
    )
  }
});


ReactDOM.render(<MainComponent />, document.getElementById('container'));
