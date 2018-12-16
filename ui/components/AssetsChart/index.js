import React, { Component } from 'react';
import { slice } from 'lodash';

import BarChart from '../BarChart';
import { convertData, paginate } from './assetsChart.util';

const PAGE_SIZE = 5;

class AssetsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releases: convertData(this.props.releases),
      handleReleaseChange: props.handleReleaseChange,
      currentReleaseIdx: props.currentReleaseIdx,
      currentPage: 0,
      totalPages: Math.ceil(this.props.releases.length / PAGE_SIZE) - 1
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(type) {
    this.setState(() => ({
      currentPage: paginate(type, this.state)
    }));
  }

  render() {
    const data = slice(
      this.state.releases,
      this.state.currentPage * PAGE_SIZE,
      (this.state.currentPage + 1) * PAGE_SIZE
    );

    return (
      <div>
        <button onClick={() => this.handlePageChange('next')}>next</button>
        <button onClick={() => this.handlePageChange('prev')}>prev</button>
        <BarChart
          data={data}
          handleReleaseChange={this.state.handleReleaseChange}
          currentReleaseIdx={this.state.currentReleaseIdx}
        />
      </div>
    );
  }
}

export default AssetsChart;
