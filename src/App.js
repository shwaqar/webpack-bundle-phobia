import React, { Component } from 'react';
import 'spectre.css';

import AssetsChart from './AssetsChart';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="App-title">Welcome to webpack-bundle-phobia</h1>
        <AssetsChart />
      </div>
    );
  }
}

export default App;
