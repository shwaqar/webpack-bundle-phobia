const _colors = ['red', 'green', 'blue', 'orange'];

function _getSum(items) {
  return items.reduce((sum, { size }) => sum + size, 0);
}

function prepareBarChartData(releases) {
  return releases.map(({ name, data }) => {
    return {
      name: name,
      data: data.map((chunk, idx) => ({
        ...chunk,
        color: _colors[idx]
      })),
      totalSize: _getSum(data)
    };
  });
}

export default prepareBarChartData;
