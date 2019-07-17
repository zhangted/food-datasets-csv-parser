import { parseFoodComposition } from './FoodComposition/csv_parser';

// @TODO soon we should move data from csvParser into index.js
// should we export methods below as well
// fileWriter
// splitJsonIntoFiles
// csvToJson
// parseDirectoryFiles

// @TODO i don't like this name, because if we use it outside - it's very long
import { parseDirectoryFiles } from './fileSystem';

// @TODO i dont think that this version will totally work...
import csvToJson from './csvToJson';

export {
  csvToJson,
  parseFoodComposition,
  parseDirectoryFiles,
}
