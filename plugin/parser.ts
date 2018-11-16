import gzipSize from 'gzip-size';
import _ from 'lodash';

// Pared date structure:
// {
//   timestamp: 1541966833843, // Time stamp when the stats were processed
//   time: 2445, // Total time taken by webpack complication process
//   size: [272844, 83821], // Total bundle size [parsed, gzipped]
//   assets: [
//     {
//       name: 'app.123xyz.js', // Asset name
//       size: [2728, 838] // Asset size [parsed, gzipped]
//     },
//     ...
//   ]
// }
function parser(stats: any) {
  const scriptFiles = _.pickBy(stats.compilation.assets, (v, name) =>
    _.endsWith(name, '.js')
  );

  const assets = _.map(scriptFiles, (asset, name) => ({
    name,
    size: [asset.size(), gzipSize.sync(asset.source())]
  }));

  const size = _.reduce(
    assets,
    ([parsed, gziped], { size }) => [parsed + size[0], gziped + size[1]],
    [0, 0]
  );

  const time = stats.endTime - stats.startTime;

  return {
    assets,
    size,
    time,
    timestamp: Date.now()
  };
}

export default parser;