const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../../../dist/index.cjs');

async function Main() {}
const rawFilePath = `${__dirname}/Fish_NV_sum (per 100 g EP).csv`;
const headers = getHeaders('./Pulse_RefDatasetscsv');

const directory = './';

const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
