import { endsWith } from 'lodash';

const _filterAssets = fn => releases =>
  releases.map(release => ({
    ...release,
    assets: release.assets.filter(fn)
  }));

export const filterByFileType = (fileType = 'all') => payload => {
  switch (fileType) {
    case 'all':
      return payload;
    case 'js':
      return _filterAssets(asset => endsWith(asset.name, 'js'))(payload);
    case 'css':
      return _filterAssets(asset => endsWith(asset.name, 'css'))(payload);
    default:
      return payload;
  }
};

export const filterLazyModules = (includeLazyModules = true) => payload => {
  switch (includeLazyModules) {
    case true:
      return payload;
    case false:
      return _filterAssets(asset => asset.isInitial)(payload);
    default:
      return payload;
  }
};
