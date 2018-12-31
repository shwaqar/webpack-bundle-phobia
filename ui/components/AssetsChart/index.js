import React, { Component } from 'react';
import { flow, findIndex } from 'lodash';

import './AssetsChart.scss';

import BarChart from '../BarChart';
import { convertData, paginate, sliceData } from './assetsChart.util';

const PAGE_SIZE = 6;

class AssetsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: 0,
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

  static getDerivedStateFromProps(props, state) {
    const data = flow(
      convertData,
      sliceData(state.currentPage, PAGE_SIZE)
    )(props.releases);

    const activeIdx = findIndex(data, { name: props.currentActiveReleaseName });

    return {
      data,
      activeIdx
    };
  }

  render() {
    return (
      <div className='row between-xs center-xs middle-xs'>
        <button
          type='button'
          className='paginate-btn'
          disabled={this.state.currentPage === this.state.totalPages}
          onClick={() => this.handlePageChange('next')}
        >
          <i className='arrow left' />
        </button>

        <BarChart
          data={this.state.data}
          handleReleaseChange={this.props.handleReleaseChange}
          activeIdx={this.state.activeIdx}
        />

        <button
          type='button'
          className='paginate-btn'
          disabled={this.state.currentPage === 0}
          onClick={() => this.handlePageChange('prev')}
        >
          <i className='arrow right' />
        </button>
      </div>
    );
  }
}

export default AssetsChart;
