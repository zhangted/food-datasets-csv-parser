// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders,
  mainWrapper
} = require('../../dist/index.cjs');



async function Main() {
  const rawFilePath = `${__dirname}/raw/Food_Composition.csv`;
  // const rawFilePath = `${__dirname}/raw/Food_Composition-Italy.csv`;
  mainWrapper(rawFilePath)

}
Main();
