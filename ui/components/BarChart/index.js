import React from 'react';
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

const Bar = ({ data, totalSize, tallestBar }) => (
  <div className='bar-chart__bar'>
    <div className='bar-tooltip'>
      Minified: {filesize(data[1].size)} | Gzipped: {filesize(data[0].size)}
    </div>
    <BarStackGroup
      chunks={data}
      totalSize={totalSize}
      tallestBar={tallestBar}
    />
  </div>
);

const BarChart = ({ data }) => {
  const tallestBar = maxBy(data, 'totalSize').totalSize;

  return (
    <div>
      <div className='bar-chart row center-xs'>
        {data.map(release => (
          <Bar key={release.name} {...release} tallestBar={tallestBar} />
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
