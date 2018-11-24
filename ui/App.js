import React, { Component } from 'react';
import 'normalize.css';
import 'flexboxgrid';
import _ from 'lodash';

import './App.scss';

import AssetsChart from './components/AssetsChart';
import releases from '../stats.json';
import AssetsTable from './components/AssetsTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releases: releases,
      currentRelease: releases[0]
    };
    this.handleReleaseChange = this.handleReleaseChange.bind(this);
  }

  handleReleaseChange(idx) {
    console.log(idx);
    this.setState(state => ({
      currentRelease: state.releases[idx]
    }));
  }

  render() {
    return (
      <div>
        <div className='row center-xs'>
          <h1 className='app-title'>Webpack Bundle Phobia</h1>
        </div>

        <div className='row around-xs middle-xs'>
          <div className='col-md-6'>
            <AssetsTable currentRelease={this.state.currentRelease} />
          </div>
          <div className='col-md-4'>
            <AssetsChart
              releases={this.state.releases}
              handleReleaseChange={this.handleReleaseChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
