import gzipSize from 'gzip-size';
import path from 'path';
import _ from 'lodash';

const findChunk = (chunks: any) => (file: any) =>
  _.find(chunks, chunk => _.includes(chunk.files, file));

const assetType = (fileName: string) =>
  _.endsWith(fileName, '.js') ? 'script' : 'css';

const isInitial = chunkInfo => (chunkInfo ? chunkInfo.canBeInitial() : true);

function parser(stats: any, name: string) {
  const findChunkByName = findChunk(stats.compilation.chunks);

  const rawFiles = _.pickBy(
    stats.compilation.assets,
    (v, name) => _.endsWith(name, '.js') || _.endsWith(name, '.css')
  );

  const assets = _.map(rawFiles, (asset, name) => ({
    name: path.basename(name),
    type: assetType(name),
    isInitial: isInitial(findChunkByName(name)),
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
    name,
    timestamp: Date.now()
  };
}

export default parser;
