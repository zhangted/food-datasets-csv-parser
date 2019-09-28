const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../../../dist/index.cjs.js');

async function Main() {}

const headers = [
  'NDB_No',
  'Nutrient_Code',
  'Nutrient_name',
  'Derivation_Code',
  'Output_value',
  'Output_uom',
];

// we don't have that folder now
const directory = '../../../../sd/src/data/Nutrition';

// //joining path of directory
const directoryPath = path.join(__dirname, directory);
parseDirectoryFiles(directoryPath, headers);
