const path = require('path');
const getHeaders = require('../../../getHeaders');
const { parseDirectoryFiles } = require('../../../fileSystem');

const headers = getHeaders('./Starchy_Roots_Tubers.csv');

const directory = './';

const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
