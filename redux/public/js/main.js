import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Conversion from './components/conversion.js';
// this instantiates the redux store
import store from './stores/configureStore';


var MainComponent = React.createClass({
  render() {
    return (
      <div>
        <Conversion />
      </div>
    )
  }
});


// Provider is just a wrapper around the main component which will pass in the
// redux store to the component.
ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>
  , document.getElementById('container'));
