import React, { Component } from 'react';
import stats from './stats.json';
import readableBytes from './readableBytes';

class AssetsChart extends Component {
  render() {
    return (
      <div>
        {stats.assets.map(asset => (
          <div>
            <h4>Name: {asset.name}</h4>
            <div>Size: {readableBytes(asset.size)}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default AssetsChart;
