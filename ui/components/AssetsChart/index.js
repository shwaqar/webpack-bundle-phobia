import React from 'react';
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

function AssetsChart(props) {
  const data = convertData(props.data);

  return (
    <div>
      <BarChart data={data} />
    </div>
  );
}

export default AssetsChart;
