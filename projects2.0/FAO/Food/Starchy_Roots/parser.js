// const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  mainWrapper
} = require('../../../../dist/index.cjs');

async function Main() {
  const rawFilePath = `${__dirname}/Starchy_Roots_Tubers.csv`;
  mainWrapper(rawFilePath)

}
Main();
