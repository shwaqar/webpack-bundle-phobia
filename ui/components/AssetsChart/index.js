import React, { Component } from 'react';
import { sumBy, add } from 'lodash';

import BarChart from '../BarChart';

const convertData = releases =>
  releases.map(release => {
    const gzipSum = sumBy(release.assets, 'gzipSize');
    const minSum = sumBy(release.assets, 'minSize');

    return {
      name: release.name,
      data: [
        {
          name: 'gzip',
          size: gzipSum
        },
        {
          name: 'min',
          size: minSum
        }
      ],
      totalSize: add(gzipSum, minSum)
    };
  });

class AssetsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: convertData(this.props.data)
    };
  }

  render() {
    return (
      <div>
        <BarChart data={this.state.data} />
      </div>
    );
  }
}

export default AssetsChart;
