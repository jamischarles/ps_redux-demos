System.transpiler = 'babel';

var imports = [];

var Second = System.import('./js/components/second.js')
var Third = System.import('./js/components/third.js')

imports.push(Second);
imports.push(Third);

// import * as second from './components/second.js';




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


Promise.all(imports).then(function(arrayOfImports) {
  [Second, Third] = arrayOfImports;
  // FIXME: Find a way to remove this...
  Second = Second.default;
  Third = Third.default;
  // console.log('arrayOfImports', arrayOfImports);
  // console.log('Second', Second);
  // console.log('Third', Third);

  ReactDOM.render(
    <MainComponent />,
    document.getElementById('container')
  );
});
