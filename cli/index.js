#! /usr/bin/env node
'use strict';

var api = require('../apijs');
var fs = require('fs');

api
  .auth({
    email: 'steve@xyz.com',
    password: 'abc123'
  })
  .then(() => api.fetchData())
  .then(writeToFile)
  .then(api.cleanUp);

function writeToFile(data) {
  fs.writeFile('firebase.json', JSON.stringify(data), err => {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
}
