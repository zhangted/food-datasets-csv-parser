// const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {

  mainWrapper
} = require('../../../../dist/index.cjs.js');

async function Main() {
  const rawFilePath = `${__dirname}/Products0.csv`;
  mainWrapper(rawFilePath)

}
Main();
