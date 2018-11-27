#! /usr/bin/env node

import { auth, cleanUp, fetchData } from '../api';
import pkgDir from 'pkg-dir';
import path from 'path';
import writeJsonFile from 'write-json-file';

// Prevent caching of this module so module.parent is always accurate
delete require.cache[__filename];
const currentDir = pkgDir.sync(module.filename) || '.';

auth({
  email: 'steve@xyz.com',
  password: 'abc123'
})
  .then(() => fetchData())
  .then((data: object) => {
    return writeJsonFile(path.join(currentDir, 'firebase.json'), data);
  })
  .then(cleanUp)
  .then(() => {
    console.log('The file was saved!');
  });
