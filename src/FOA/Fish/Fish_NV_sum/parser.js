const path = require('path')
const getHeaders = require('../../../getHeaders')
const { parseDirectoryFiles } = require('../../../fileSystem')

const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv')
console.log('parser.js:', headers) // This logs a pending promise.

// I might have to include lines 5-14 insinde of an async function and await it.
// This will become clearer once parseDrectoryFiles is functional.

const directory = './'

const directoryPath = path.join(__dirname, directory)

parseDirectoryFiles(directoryPath, headers)
