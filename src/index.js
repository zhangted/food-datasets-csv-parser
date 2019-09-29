// import { parseFoodComposition } from '../projects2.0/FoodComposition/parser';

// @TODO i don't like this name,
// because if we use it outside - it's very long
// and it boring and we at this time have
// some many copy-pasting it in projects.2.0
import { parseDirectoryFiles } from './fileSystem';

import csvToJson from './csvToJson';

import getHeaders from './getHeaders';
import parseCsv from './parseCsv';

export {
  csvToJson,
  getHeaders,
  // @TODO let's debate should we export
  // parseCsv or we just using it inside of csvToJson
  parseCsv,
  // parseFoodComposition,
  parseDirectoryFiles,
};
