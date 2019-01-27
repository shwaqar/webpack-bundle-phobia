import React from 'react';
import filesize from 'filesize';
import {
  sumBy,
  floor,
  divide,
  multiply,
  flow,
  last,
  subtract,
  find
} from 'lodash';
import dayjs from 'dayjs';

import './AssetsTable.scss';

const readableSize = filesize.partial({ output: 'array' });

const percentageChange = (newNum, origNum) =>
  multiply(divide(subtract(newNum, origNum), newNum), 100);

const withoutHash = name => {
  const split = name.split('.');
  return `${split[0]}.${split[2]}`;
};

const addHashedChangedInfo = (currentRelease, prevRelease) => {
  return currentRelease.map(currentAsset => {
    const match = find(
      prevRelease,
      prevAsset =>
        withoutHash(prevAsset.name) === withoutHash(currentAsset.name)
    );
    const hashedChanged = match ? currentAsset.name !== match.name : false;

    return {
      ...currentAsset,
      hashedChanged
    };
  });
};

const formatDiff = diff => {
  if (diff === 0) return [0, 0];

  const sign = Math.sign(diff);
  const trimmed = +diff.toFixed(2);
  const formatedDiff = `${Math.abs(trimmed)}%`;

  return [sign, formatedDiff];
};

const getDiff = (currentRelease, prevRelease) => {
  return currentRelease.map(currentAsset => {
    const match = find(
      prevRelease,
      prevAsset =>
        withoutHash(prevAsset.name) === withoutHash(currentAsset.name)
    );

    const gzipSizeDiff = match
      ? formatDiff(percentageChange(currentAsset.gzipSize, match.gzipSize))
      : 0;
    const minSizeDiff = match
      ? formatDiff(percentageChange(currentAsset.minSize, match.minSize))
      : 0;

    return {
      ...currentAsset,
      gzipSizeDiff,
      minSizeDiff
    };
  });
};

const addTotalColumn = assets => {
  const totalGzipSize = sumBy(assets, 'gzipSize');
  const totalMinSize = sumBy(assets, 'minSize');

  const totalSizeRow = {
    name: 'Total',
    gzipSize: totalGzipSize,
    minSize: totalMinSize
  };

  return [...assets, totalSizeRow];
};

const addPercentages = assets => {
  const totalsRow = last(assets);

  return assets.map(asset => ({
    ...asset,
    percent: floor(multiply(divide(asset.minSize, totalsRow.minSize), 100), 2)
  }));
};

const addReadableBytes = assets =>
  assets.map(asset => ({
    ...asset,
    readableGzipSize: readableSize(asset.gzipSize),
    readableMinSize: readableSize(asset.minSize)
  }));

const AssetsTableItem = ({
  name,
  percent,
  readableGzipSize,
  readableMinSize,
  gzipSizeDiff = [0, 0],
  minSizeDiff = [0, 0],
  hashedChanged
}) => {
  return (
    <li className='assets-table__item row'>
      <div
        className={`assets-table__name col-md-3 ${
          hashedChanged ? 'assets-table__name--hash-change' : ''
        }`}
      >
        {name}
      </div>
      <div className='row col-md-9'>
        <div className='assets-table__size assets-table__size--percent col-md-4'>
          <span className='assets-table__value'>{percent}</span>
          <span className='assets-table__unit'>{percent ? '%' : ''}</span>
        </div>
        <div className='row between-xs middle-xs assets-table__size col-md-4'>
          <div className='column'>
            <div>
              <span className='assets-table__value'>{readableMinSize[0]}</span>
              <span className='assets-table__unit'>{readableMinSize[1]}</span>
            </div>
            <div className='assets-table__size-type'>MIN</div>
          </div>
          <div
            className={`assets-table__diff end-xs ${
              minSizeDiff[0] < 0
                ? 'assets-table__diff--pos'
                : 'assets-table__diff--neg'
            }`}
          >
            {minSizeDiff[1] || ''}
          </div>
        </div>
        <div className='row between-xs middle-xs assets-table__size col-md-4'>
          <div className='column'>
            <div>
              <span className='assets-table__value'>{readableGzipSize[0]}</span>
              <span className='assets-table__unit'>{readableGzipSize[1]}</span>
            </div>
            <div className='assets-table__size-type'>MIN + GZIP</div>
          </div>
          <div
            className={`assets-table__diff ${
              gzipSizeDiff[0] < 0
                ? 'assets-table__diff--pos'
                : 'assets-table__diff--neg'
            }`}
          >
            {gzipSizeDiff[1] || ''}
          </div>
        </div>
      </div>
    </li>
  );
};

function AssetsTable({ releases, currentReleaseIdx }) {
  const currentRelease = addTotalColumn(releases[currentReleaseIdx].assets);
  const prevRelease = releases[currentReleaseIdx + 1]
    ? addTotalColumn(releases[currentReleaseIdx + 1].assets)
    : null;
  const data = flow(
    _ => (prevRelease ? getDiff(_, prevRelease) : _),
    _ => (prevRelease ? addHashedChangedInfo(_, prevRelease) : _),
    addPercentages,
    addReadableBytes
  )(currentRelease);

  return (
    <div>
      <div className='release-summary row middle-xs between-xs'>
        <div className='release-summary__name'>
          {releases[currentReleaseIdx].name}
        </div>
        <div className='end-xs'>
          <div className='release-summary__timestamp'>
            {dayjs(releases[currentReleaseIdx].timestamp).format(
              'DD-MM-YYYY hh:mm A'
            )}
          </div>
          <div className='release-summary__time'>
            Compile Time: {releases[currentReleaseIdx].time} ms
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
