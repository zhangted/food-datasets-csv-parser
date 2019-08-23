const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders,
} = require('../../../../dist/index.cjs');

const headers = getHeaders('Pulse_NV_sum (per 100 g EP on FW).csv');

const directory = './';

const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
