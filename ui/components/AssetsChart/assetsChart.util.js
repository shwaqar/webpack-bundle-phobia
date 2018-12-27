import { sumBy, add, slice } from 'lodash';

export const convertData = releases =>
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

let incPage = ({ currentPage, totalPages }) =>
  currentPage === totalPages ? currentPage : ++currentPage;
let decPage = ({ currentPage }) =>
  currentPage === 0 ? currentPage : --currentPage;

export const paginate = (action, payload) => {
  switch (action) {
    case 'next':
      return incPage(payload);
    case 'prev':
      return decPage(payload);
    default:
      return payload;
  }
};

export const sliceData = (currentPage, pageSize) => data =>
  slice(data, currentPage * pageSize, (currentPage + 1) * pageSize);
