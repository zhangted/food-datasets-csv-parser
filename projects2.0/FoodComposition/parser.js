// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../dist/index.cjs');
// } = require('../../../../dist/index.cjs.js');


async function Main() {
  const rawFilePath = `${__dirname}/raw/Food_Composition.csv`;
  // const rawFilePath = `${__dirname}/raw/Food_Composition-Italy.csv`;
  const headers = await getHeaders(rawFilePath);

  const directory = './';

  const directoryPath = path.join(__dirname, directory);

  parseDirectoryFiles(directoryPath, headers);


}
Main();
