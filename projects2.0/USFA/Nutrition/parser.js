const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../../../dist/index.cjs.js');

async function Main() {
  
}
const rawFilePath = `${__dirname}/Fish_NV_sum (per 100 g EP).csv`;
const headers = await getHeaders(rawFilePath);

const headers = [
  'NDB_No',
  'Nutrient_Code',
  'Nutrient_name',
  'Derivation_Code',
  'Output_value',
  'Output_uom'
];
// const rawFilePath = `${__dirname}/Fish_NV_sum (per 100 g EP).csv`;
// we don't have that folder now
const directory = '../../../../sd/src/data/Nutrition';

// //joining path of directory
const directoryPath = path.join(__dirname, directory);
parseDirectoryFiles(directoryPath, headers);
