// import { parseFoodComposition } from '../projects2.0/FoodComposition/parser';
import path from 'path';

import csvToJson from './csvToJson';
// https://github.com/GroceriStar/food-datasets-csv-parser/issues/180
import getHeaders from './getHeaders';
import parseCsv from './parseCsv';

// @TODO i don't like this name,
// because if we use it outside - it's very long
// and it boring and we at this time have
// some many copy-pasting it in projects.2.0
import parseDirectoryFiles from './fileSystem';

// i adding utils here only because it's my guess
import { readAllFiles, joinPath, getList } from './utils';

const mainWrapper = async (filePath) => {
  const headers = await getHeaders(filePath);
  // I might have to include lines 5-14 insinde of an async function and await it.
  // This will become clearer once parseDrectoryFiles is functional.

  // @TODO this line is a good idea. For all of our csv parsers
  // projects we have a separated folder with files + parser inside.
  // we can make a root directory as default inside of `parserDirectoryFiles`
  // and change it if passed another variable
  const directory = './';

  const directoryPath = path.join(__dirname, directory + filePath);
  console.log(filePath);
  console.log(directoryPath);
  parseDirectoryFiles(directoryPath, headers);
};

export {
  csvToJson,
  getHeaders,
  // @TODO let's debate should we export
  // parseCsv or we just using it inside of csvToJson
  parseCsv,
  // parseFoodComposition,
  parseDirectoryFiles,
  mainWrapper,

  // can be removed later
  readAllFiles, joinPath, getList,
};
