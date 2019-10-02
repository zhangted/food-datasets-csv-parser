const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../../../dist/index.cjs.js');

async function Main() {
  const rawFilePath = `${__dirname}/Fish_NV_sum (per 100 g EP).csv`;
  const headers = await getHeaders(rawFilePath);

  // I might have to include lines 5-14 insinde of an async function and await it.
  // This will become clearer once parseDrectoryFiles is functional.

  // @TODO this line is a good idea. For all of our csv parsers
  // projects we have a separated folder with files + parser inside.
  // we can make a root directory as default inside of `parserDirectoryFiles`
  // and change it if passed another variable
  const directory = './';

  const directoryPath = path.join(__dirname, directory);

  parseDirectoryFiles(directoryPath, headers);
}

Main();

const headers = [
  'NDB_No',
  'Serving_Size',
  'Serving_Size_UOM',
  'Household_Serving_Size',
  'Household_Serving_Size_UOM'
];

// we don't have that folder now
const directory = '../../../../sd/src/data/Serving_Size';

// //joining path of directory
const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
