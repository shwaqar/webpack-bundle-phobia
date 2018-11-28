#! /usr/bin/env node

import { cleanUp, fetchData } from '../api';
import findUp from 'find-up';
import fs from 'fs';
import path from 'path';

const pkgDir = findUp.sync('package.json');
const statsFilePath = path.join(path.dirname(pkgDir), 'stats.json');

const _writeToFile = (path: string) => (data: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

fetchData()
  .then((data: object) => JSON.stringify(data))
  .then(_writeToFile(statsFilePath))
  .then(cleanUp)
  .then(() => {
    console.log('The file was saved!');
  });
