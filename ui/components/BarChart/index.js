import { h, render } from 'preact';
import { maxBy } from 'lodash';
import filesize from 'filesize';

import './BarChart.scss';

const BarStack = ({ size, name, totalSize, barHeight }) => {
  const stackHeight = (size / totalSize) * barHeight;

  return (
    <div
      style={{ height: `${stackHeight}%` }}
      className={`bar-chart__stack ${name}`}
    />
  );
};

const BarStackGroup = ({ chunks, totalSize, tallestBar }) => {
  const barHeight = (totalSize / tallestBar) * 100;

  return (
    <div className='bar-chart__stack-group'>
      <div className='bar-tooltip' style={{ bottom: `${barHeight}%` }}>
        Minified: {filesize(chunks[1].size)} | Gzipped:{' '}
        {filesize(chunks[0].size)}
      </div>
      {chunks.map(chunk => (
        <BarStack
          key={chunk.name}
          {...chunk}
          totalSize={totalSize}
          barHeight={barHeight}
        />
      ))}
    </div>
  );
};

const Bar = ({
  data,
  totalSize,
  tallestBar,
  releasesIdx,
  isActive,
  handleReleaseChange
}) => (
  <div
    className={`bar-chart__bar ${isActive ? 'active' : ''}`}
    onClick={() => handleReleaseChange(releasesIdx)}
  >
    <BarStackGroup
      chunks={data}
      totalSize={totalSize}
      tallestBar={tallestBar}
    />
  </div>
);

const BarChart = ({ data, handleReleaseChange, currentReleaseIdx }) => {
  const tallestBar = maxBy(data, 'totalSize').totalSize;

  return (
    <div>
      <div className='bar-chart row center-xs'>
        {data.map((release, idx) => (
          <Bar
            key={release.name}
            tallestBar={tallestBar}
            releasesIdx={idx}
            handleReleaseChange={handleReleaseChange}
            isActive={currentReleaseIdx === idx}
            {...release}
          />
        ))}
      </div>
      <div className='bar-chart-legend row center-xs'>
        <div className='bar-chart-legend__item row'>
          <div className='bar-chart-legend__box min' />
          MIN
        </div>
        <div className='bar-chart-legend__item row'>
          <div className='bar-chart-legend__box gzip' />
          GZIP
        </div>
      </div>
    </div>
  );
};

export default BarChart;
