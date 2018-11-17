import gzipSize from 'gzip-size';
import _ from 'lodash';

const findChunk = (chunks: any) => (file: any) =>
  _.find(chunks, chunk => _.includes(chunk.files, file));

const assetType = (fileName: string) =>
  _.endsWith(fileName, '.js') ? 'script' : 'css';

function parser(stats: any) {
  const findByChunk = findChunk(stats.compilation.chunks);

  const rawFiles = _.pickBy(
    stats.compilation.assets,
    (v, name) => _.endsWith(name, '.js') || _.endsWith(name, '.css')
  );

  const assets = _.map(rawFiles, (asset, name) => ({
    name,
    type: assetType(name),
    isInitial: findByChunk(name).canBeInitial(),
    minSize: asset.size(),
    gzipSize: gzipSize.sync(asset.source())
  }));

  const totalMinSize = _.sumBy(assets, asset => asset.minSize);
  const totalGzipSize = _.sumBy(assets, asset => asset.gzipSize);

  const time = stats.endTime - stats.startTime;

  return {
    assets,
    totalMinSize,
    totalGzipSize,
    time,
    timestamp: Date.now()
  };
}

export default parser;
