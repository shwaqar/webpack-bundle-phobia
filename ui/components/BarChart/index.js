import React from 'react';
import { maxBy } from 'lodash';

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
    <div className='bar-chart'>
      {data.map(release => (
        <Bar key={release.name} {...release} tallestBar={tallestBar} />
      ))}
    </div>
  );
};

export default BarChart;
