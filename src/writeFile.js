/* eslint-disable no-unused-vars */
import { resolve } from 'path';

/**
 * For fixPath()
 * @param {String} path
 */
const fixPath = (path) => {
  let newPath = resolve(__dirname, path); // absolute path
  if (newPath[-1] !== '/') {
    newPath += '/';
  } // path correction
  return newPath;
};

/**
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  let updatedFileName = fileName.replace(/ /g, '_'); // Replace space with underscore
  updatedFileName = fileName.toLowerCase(); // Maintain Uniformity
  return updatedFileName;
};

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
const getFileName = (file, fileData, flag, index) => {
  let fileName;
  if (flag === 1) {
    // for example: 23-someJsonFile.json
    fileName = `${index}-${file}`;
  } else {
    // for example: someValueOfName.json
    fileName = `${fileData.name}.json`;
  }
  fileName = fixFileName(fileName);
  return fileName;
};

export default {
  getFileName,
  fixPath,
};
