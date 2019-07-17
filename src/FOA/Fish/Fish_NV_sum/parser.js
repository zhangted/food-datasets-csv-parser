// const path = require('path')
const getHeaders = require('../../../getHeaders')
// const { parseDirectoryFiles } = require('../../../fileSystem')

const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv')
console.log('parser.js:', headers)

// const directory = './'

// const directoryPath = path.join(__dirname, directory)

// parseDirectoryFiles(directoryPath, headers)
