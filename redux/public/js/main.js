import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Conversion from './components/conversion.js';
import store from './stores/configureStore'


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


ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>
  , document.getElementById('container'));
