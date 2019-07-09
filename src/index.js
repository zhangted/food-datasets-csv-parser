const {
  parseFoodComposition
} = require('./FoodComposition/csv_parser')

// @TODO soon we should move data from csvParser into index.js
// should we export methods below as well
// fileWriter
// splitJsonIntoFiles
// csvToJson
// parseDirectoryFiles

// @TODO i don't like this name, because if we use it outside - it's very long
const {
  parseDirectoryFiles
} = require('./CCCSVParser') // @TODO i use this name, because rollup was confused. later we'll change it

module.exports = {
  parseFoodComposition,
  parseDirectoryFiles
}
