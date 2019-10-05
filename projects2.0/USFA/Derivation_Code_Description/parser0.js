const path = require('path');
// const { parseDirectoryFiles } = require('../../fileSystem');

// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../../../dist/index.cjs.js');

async function Main() {
  const rawFilePath = `${__dirname}/Derivation_Code_Description.csv`;
  const headers = await getHeaders(rawFilePath);

}

Main();


const headers = ['derivation_code', 'Derivation_Descript'];

// we don't have that folder now
const directory = '../../../sd/src/data/Derivation_Code_Description';

// //joining path of directory
const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
