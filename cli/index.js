#! /usr/bin/env node
'use strict';

var api = require('../apijs');
var fs = require('fs');
var pkgDir = require('pkg-dir');
var path = require('path');
var pkgUp = require('pkg-up');

// Prevent caching of this module so module.parent is always accurate
delete require.cache[__filename];
var parentDir = path.dirname((module.parent && module.parent.filename) || '.');
var currentDir = pkgUp.sync('.');

var dir = pkgDir.sync(parentDir);
console.log(currentDir);

api
  .auth({
    email: 'steve@xyz.com',
    password: 'abc123'
  })
  .then(() => api.fetchData())
  .then(writeToFile)
  .then(api.cleanUp);

function writeToFile(data) {
  fs.writeFile(path.join(dir, 'firebase.json'), JSON.stringify(data), err => {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
}
