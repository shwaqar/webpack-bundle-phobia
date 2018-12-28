import React from 'react';
import filesize from 'filesize';
import { sumBy, floor, divide, multiply, orderBy } from 'lodash';
import dayjs from 'dayjs';

import './AssetsTable.scss';

const size = filesize.partial({ output: 'array' });

const processData = assets => {
  assets = orderBy(assets, 'minSize', 'desc');

  const totalGzipSize = sumBy(assets, 'gzipSize');
  const totalMinSize = sumBy(assets, 'minSize');

  const totalSizeRow = {
    name: 'Total',
    gzipSize: size(totalGzipSize),
    minSize: size(totalMinSize)
  };

  const processedData = assets.map(asset => ({
    name: asset.name,
    percent: floor(multiply(divide(asset.minSize, totalMinSize), 100), 2),
    gzipSize: size(asset.gzipSize),
    minSize: size(asset.minSize)
  }));

  return [...processedData, totalSizeRow];
};

const AssetsTableItem = ({ name, percent, gzipSize, minSize }) => {
  return (
    <li className='assets-table__item row'>
      <div className='assets-table__name col-md-3'>{name}</div>
      <div className='row col-md-9'>
        <div className='assets-table__size assets-table__size--percent col-md-4'>
          <span className='assets-table__value'>{percent}</span>
          <span className='assets-table__unit'>{percent ? '%' : ''}</span>
        </div>
        <div className='assets-table__size col-md-4'>
          <div>
            <span className='assets-table__value'>{minSize[0]}</span>
            <span className='assets-table__unit'>{minSize[1]}</span>
          </div>
          <div className='assets-table__size-type'>MIN</div>
        </div>
        <div className='assets-table__size col-md-4'>
          <div>
            <span className='assets-table__value'>{gzipSize[0]}</span>
            <span className='assets-table__unit'>{gzipSize[1]}</span>
          </div>
          <div className='assets-table__size-type'>MIN + GZIP</div>
        </div>
      </div>
    </li>
  );
};

function AssetsTable({ releases, currentReleaseIdx }) {
  const currentRelease = releases[currentReleaseIdx];
  const data = processData(currentRelease.assets);

  return (
    <div>
      <div className='release-summary row middle-xs between-xs'>
        <div className='release-summary__name'>{currentRelease.name}</div>
        <div className='end-xs'>
          <div className='release-summary__timestamp'>
            {dayjs(currentRelease.timestamp).format('DD-MM-YYYY hh:mm A')}
          </div>
          <div className='release-summary__time'>
            Compile Time: {currentRelease.time} ms
          </div>
        </div>
      </div>
      <ul className='assets-table'>
        {data.map((asset, idx) => (
          <AssetsTableItem key={idx} {...asset} />
        ))}
      </ul>
    </div>
  );
}

export default AssetsTable;
