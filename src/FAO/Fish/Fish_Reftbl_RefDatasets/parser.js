const path = require("path");
const getHeaders = require("../../../getHeaders");
const { parseDirectoryFiles } = require("../../../fileSystem");

const headers = getHeaders(".Fish_Reftbl_RefDatasets.csv");

const directory = "./";

const directoryPath = path.join(__dirname, directory);

parseDirectoryFiles(directoryPath, headers);
