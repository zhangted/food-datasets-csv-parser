// const filePath = require('../files')
import { readFileSync, mkdirSync } from 'fs';
// @TODO replace PATH constant with a normal way...
// at least we can deconstruct it and only use methods inside of this library.
import {
  resolve, basename, extname, parse,
} from 'path';
import { write, isFolderExists } from '@groceristar/static-data-generator';
import { readAllFiles } from './utils';
// const { promisify } = require('util')

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

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * */
const saveFile = (folderNamePath, file, fileData, flag) => {
  const fileDataLength = fileData.length;
  for (let i = 0; i < fileDataLength; i = +1) {
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
  if (isFolderExists(folderNamePath)) {
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
  const file = basename(fullPath);
  const path = parse(fullPath).dir;

  if (extname(file) !== '.json') {
    console.log('Require .json file.');
    return;
  }

  const newPath = fixPath(path);
  const fileData = readData(newPath, file); // Reading data...
  const folderNamePath = makeFolder(newPath, file); // new folder to save splitted files
  saveFile(folderNamePath, file, fileData, flag); // saving files

  if (callback instanceof Function) {
    setTimeout(() => {
      callback(folderNamePath, keys);
    }, 1000);
  }
};

/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  content.forEach((contentElement) => {
    contentElement.forEach((obj) => {
      keys.forEach((key) => {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      });
    });
  });
  return content;
};

/**
 * For combineObjects()
 * @param {String} path Path of folder where all splitted files are stored
 * @param {var} keys List of keys that are to be removed
 */
const combineObject = (path, keys) => {
  const newPath = fixPath(path);
  let content = readAllFiles(newPath); // read all json files
  content = updateContent(content, keys); // modifying structure
  const fileNamePath = `${newPath + basename(newPath)}_combined.json`; // for example: elements_combined.json
  write(fileNamePath, content); // saving
};

export default {
  write,
  splitObject,
  combineObject,
  readData,
};
