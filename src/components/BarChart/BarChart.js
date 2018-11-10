import React from 'react';
import './BarChart.scss';

import prepareBarChartData from './prepareBarChartData';

const BarStack = ({ size, color, totalSize, barHeight }) => {
  const stackHeight = (size / totalSize) * barHeight;

  return (
    <div style={{ height: `${stackHeight}%`, background: color }} className="bar-chart__stack" />
  );
};

const BarStackGroup = ({ chunks, totalSize, longestBar }) => {
  const barHeight = (totalSize / longestBar) * 100;

  return (
    <div className="bar-chart__stack-group">
      {chunks.map(chunk => <BarStack {...chunk} totalSize={totalSize} barHeight={barHeight} />)}
    </div>
  );
};

const Bar = ({ name, data, totalSize, longestBar }) => (
  <div className="bar-chart__bar">
    <BarStackGroup chunks={data} totalSize={totalSize} longestBar={longestBar} />
    <div>{name}</div>
  </div>
);

const BarChart = ({ data }) => {
  const releases = prepareBarChartData(data);
  const maxSizeInEach = releases.map(release => release.totalSize);
  const longestBar = Math.max(...maxSizeInEach);

  return (
    <div className="bar-chart">
      {releases.map(release => <Bar {...release} longestBar={longestBar} />)}
    </div>
  );
};

export default BarChart;
