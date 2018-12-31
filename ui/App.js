import React, { Component } from 'react';
import 'normalize.css';
import 'flexboxgrid';
import { flow, values, findIndex } from 'lodash';

import './App.scss';

import AssetsChart from './components/AssetsChart';
import AssetsTable from './components/AssetsTable';

import { filterByFileType, filterLazyModules } from './utils';
import Filters from './components/Filters';

const API_ENDPOINT = 'http://localhost:3333';

const getMockStats = () => import('../mock-stats.json');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentReleaseIdx: 0,
      releases: [],
      includeLazyModules: true,
      fileTypes: 'all'
    };

    this.handleReleaseChange = this.handleReleaseChange.bind(this);
    this.handleIncludeLazyModules = this.handleIncludeLazyModules.bind(this);
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this);
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      fetch(`${API_ENDPOINT}/mock_stats.json`)
        .then(res => res.json())
        .then(data => values(data))
        .then(releases => this.setState(() => ({ releases })));
    } else {
      getMockStats()
        .then(data => values(data))
        .then(releases => this.setState(() => ({ releases })));
    }
  }

  handleReleaseChange(name) {
    const idx = findIndex(this.state.releases, { name });

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
    const releases = flow(
      filterLazyModules(this.state.includeLazyModules),
      filterByFileType(this.state.fileTypes)
    )(this.state.releases);

    if (this.state.releases.length === 0) {
      return (
        <div className='column middle-xs center-xs empty-state'>
          <h1 className='app-title'>Webpack Bundle Phobia</h1>
          <h3>No data available</h3>
        </div>
      );
    }

    return (
      <div>
        <div className='row center-xs'>
          <h1 className='app-title'>Webpack Bundle Phobia</h1>
        </div>

        <Filters
          fileTypes={this.state.fileTypes}
          includeLazyModules={this.state.includeLazyModules}
          handleFileTypeChange={this.handleFileTypeChange}
          handleIncludeLazyModules={this.handleIncludeLazyModules}
        />

        <div className='row around-xs top-xs'>
          <div className='col-md-6'>
            <AssetsTable
              releases={releases}
              currentReleaseIdx={this.state.currentReleaseIdx}
            />
          </div>
          <div className='col-md-4'>
            <AssetsChart
              releases={releases}
              currentActiveReleaseName={
                this.state.releases[this.state.currentReleaseIdx].name
              }
              handleReleaseChange={this.handleReleaseChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
