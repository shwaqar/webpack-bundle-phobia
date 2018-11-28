#! /usr/bin/env node

import { cleanUp, fetchData } from '../api';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const statsFilePath = path.resolve(__dirname, '../stats.json');

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
    console.log(
      chalk.green(
        'bundle-phobia-webpack-plugin: Stats file was downloaded and saved to local directory'
      )
    );
  });
