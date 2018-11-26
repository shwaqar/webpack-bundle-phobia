import { h, render } from 'preact';
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

function AssetsChart({ releases, handleReleaseChange, currentReleaseIdx }) {
  const data = convertData(releases);

  return (
    <div>
      <BarChart
        data={data}
        handleReleaseChange={handleReleaseChange}
        currentReleaseIdx={currentReleaseIdx}
      />
    </div>
  );
}

export default AssetsChart;
