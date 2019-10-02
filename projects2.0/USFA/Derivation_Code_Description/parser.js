// const path = require('path');
// const { parseDirectoryFiles } = require('../../fileSystem');

// @TODO update require. when we export this method - we can connect it from index.js
const {
  mainWrapper
} = require('../../../../dist/index.cjs.js');

async function Main() {
  const rawFilePath = `${__dirname}/Derivation_Code_Description.csv`;
  mainWrapper(rawFilePath)
  mainWrapper(rawFilePath)

}
Main();
