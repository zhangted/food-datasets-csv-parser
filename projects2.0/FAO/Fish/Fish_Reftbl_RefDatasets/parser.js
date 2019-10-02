const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const { parseDirectoryFiles, parseCsv } = require('../../../../dist/index.cjs');

async function Main() {
  const rawFilePath = `${__dirname}/Fish_Reftbl_RefDatasets.csv`;
  mainWrapper(rawFilePath)

}
Main();
