// const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders,
  mainWrapper
} = require('../../../../dist/index.cjs.js');

async function Main() {
  const rawFilePath = `${__dirname}/Nutrient0.csv`;
  // const rawFilePath = `${__dirname}/Nutrient1.csv`;
  // const rawFilePath = `${__dirname}/Nutrient2.csv`;
  // const rawFilePath = `${__dirname}/Nutrient3.csv`;
  // const rawFilePath = `${__dirname}/Nutrient4.csv`;
  mainWrapper(rawFilePath)

}
Main();
