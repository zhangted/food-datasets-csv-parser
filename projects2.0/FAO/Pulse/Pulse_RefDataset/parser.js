const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../../../dist/index.cjs');

async function Main() {
  const rawFilePath = `${__dirname}/Pulse_RefDatasets.csv`;
  mainWrapper(rawFilePath)

}
Main();
