// import { parseFoodComposition } from '../projects2.0/FoodComposition/parser';

// @TODO i don't like this name, because if we use it outside - it's very long
import { parseDirectoryFiles } from './fileSystem';

import csvToJson from './csvToJson';

import getHeaders from './getHeaders';

export {
  csvToJson, getHeaders,
  // parseFoodComposition,
  parseDirectoryFiles,
};
