import React, { Component } from 'react';
import 'spectre.css';

import AssetsChart from './components/AssetsChart';
import stats from '../stats.json';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Webpack Bundle Phobia</h1>
        <AssetsChart data={stats} />
      </div>
    );
  }
}

export default App;
