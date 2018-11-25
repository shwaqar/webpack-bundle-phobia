import React, { Component } from 'react';
import 'normalize.css';
import 'flexboxgrid';
import { flow } from 'lodash';

import './App.scss';

import AssetsChart from './components/AssetsChart';
import releases from '../stats.json';
import AssetsTable from './components/AssetsTable';

import { filterByFileType, filterLazyModules } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReleaseIdx: 0,
      releases: releases,
      includeLazyModules: true,
      fileTypes: 'all'
    };
    this.handleReleaseChange = this.handleReleaseChange.bind(this);
    this.handleIncludeLazyModules = this.handleIncludeLazyModules.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
  }

  handleReleaseChange(idx) {
    this.setState(() => ({
      currentReleaseIdx: idx
    }));
  }

  handleIncludeLazyModules({ target }) {
    this.setState(() => ({
      includeLazyModules: target.checked
    }));
  }

  handleFileTypeChange({ target }) {
    this.setState(() => ({
      fileTypes: target.value
    }));
  }

  render() {
    return (
      <div>
        <div className='row center-xs'>
          <h1 className='app-title'>Webpack Bundle Phobia</h1>
        </div>

        <div>
          <label>
            Include lazy loaded modules
            <input
              name='includeLazyModules'
              type='checkbox'
              checked={this.state.includeLazyModules}
              onChange={this.handleIncludeLazyModules}
            />
          </label>
        </div>

        <div>
          <label>
            Scripts
            <input
              type='radio'
              name='fileTypes'
              value='js'
              checked={this.state.fileTypes === 'js'}
              onChange={this.handleFileTypeChange}
            />
          </label>
          <label>
            Styles
            <input
              type='radio'
              name='fileTypes'
              value='css'
              checked={this.state.fileTypes === 'css'}
              onChange={this.handleFileTypeChange}
            />
          </label>
          <label>
            All
            <input
              type='radio'
              name='fileTypes'
              value='all'
              checked={this.state.fileTypes === 'all'}
              onChange={this.handleFileTypeChange}
            />
          </label>
        </div>

        <div className='row around-xs top-xs'>
          <div className='col-md-6'>
            <AssetsTable
              releases={flow(
                filterLazyModules(this.state.includeLazyModules),
                filterByFileType(this.state.fileTypes)
              )(this.state.releases)}
              currentReleaseIdx={this.state.currentReleaseIdx}
            />
          </div>
          <div className='col-md-4'>
            <AssetsChart
              releases={flow(
                filterLazyModules(this.state.includeLazyModules),
                filterByFileType(this.state.fileTypes)
              )(this.state.releases)}
              currentReleaseIdx={this.state.currentReleaseIdx}
              handleReleaseChange={this.handleReleaseChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
