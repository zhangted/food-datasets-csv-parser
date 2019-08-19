// const filePath = require('../files')
import { readFileSync, mkdirSync } from 'fs';
// @TODO replace PATH constant with a normal way...
// at least we can deconstruct it and only use methods inside of this library.
import PATH from 'path';
import { write } from '@groceristar/static-data-generator';
import { isDirectory } from './utils';
// const { promisify } = require('util')
// const _ = require('lodash')

/**
 * For fixPath()
 * @param {String} path
 */
const fixPath = (path) => {
  path = PATH.resolve(__dirname, path); // absolute path
  if (path[-1] !== '/') { path += '/'; } // path correction
  return path;
};

/**
 * readData()
 * @param {string} path
 * @param {string} file
 * */
const readData = (path, file) => {
  console.log(path + file);

  const data = readFileSync(path + file);
  console.log(data);

  const fileData = JSON.parse(data);
  return fileData;
};

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * */
const saveFile = (folderNamePath, file, fileData, flag) => {
  const fileDataLength = fileData.length;
  for (let i = 0; i < fileDataLength; i++) {
    const fileName = getFileName(file, fileData[i], flag, i);
    const elementPath = `${folderNamePath}/${fileName}`;
    write(elementPath, fileData[i]);
  }
};

/**
 * @param {String} path
 * @param {String} file
 */
const makeFolder = (path, file) => {
  const folderName = `${file.slice(0, -5)}_elements`;
  const folderNamePath = path + folderName;
  if (isDirectory(folderNamePath)) {
    mkdirSync(folderNamePath);
  }
  return folderNamePath;
};

/**
 * For splitObject
 *
 * @describe split large files into single elements
 *
 * @param {String} fullPath
 * @param {var} flag
 * @param {var} keys
 * @param {var} callback
 */
const splitObject = (fullPath, flag = 1, keys = [], callback) => {
  /*
       flag=1 ==> name according to index
       flag=0 ==> name according to "name" attribute
     */
  const file = PATH.basename(fullPath);
  let path = PATH.parse(fullPath).dir;

  if (PATH.extname(file) !== '.json') {
    console.log('Require .json file.');
    return;
  }

  path = fixPath(path);
  const fileData = readData(path, file); // Reading data...
  const folderNamePath = makeFolder(path, file); // new folder to save splitted files
  saveFile(folderNamePath, file, fileData, flag); // saving files

  if (callback instanceof Function) {
    setTimeout(() => {
      callback(folderNamePath, keys);
    }, 1000);
  }
};

/**
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  fileName = fileName.replace(/ /g, '_'); // Replace space with underscore
  fileName = fileName.toLowerCase(); // Maintain Uniformity
  return fileName;
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
  if (flag === 1) fileName = `${index}-${file}`; // for example: 23-someJsonFile.json
  else fileName = `${fileData.name}.json`; // for example: someValueOfName.json
  fileName = fixFileName(fileName);
  return fileName;
};

/**
 * For combineObjects()
 * @param {String} path Path of folder where all splitted files are stored
 * @param {var} keys List of keys that are to be removed
 */
const combineObject = (path, keys) => {
  path = fixPath(path);
  let content = srcUtils.readAllFiles(path); // read all json files
  content = updateContent(content, keys); // modifying structure
  const fileNamePath = `${path + PATH.basename(path)}_combined.json`; // for example: elements_combined.json
  write(fileNamePath, content); // saving
};

/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  content.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key];
      });
    });
  });
  return content;
};

export default {
  write,
  splitObject,
  combineObject,
  makeReadable,
  readData,
};
