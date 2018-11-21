import React, { Component } from 'react';
import 'normalize.css';
import 'flexboxgrid';

import './App.scss';

import AssetsChart from './components/AssetsChart';
import stats from '../stats.json';
import AssetsTable from './components/AssetsTable';

class App extends Component {
  render() {
    return (
      <div>
        <div className='row center-xs'>
          <h1 className='app-title'>Webpack Bundle Phobia</h1>
        </div>

        <div className='row around-xs middle-xs'>
          <div className='col-md-6'>
            <AssetsTable data={stats} />
          </div>
          <div className='col-md-4'>
            <AssetsChart data={stats} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
