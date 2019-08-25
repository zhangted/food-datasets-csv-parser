const path = require('path');

const {
  parseDirectoryFiles,
  getHeaders,
} = require('../../../../dist/index.cjs');

const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv');
console.log('parser.js:', headers); // This logs a pending promise.

const directory = './';

const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
