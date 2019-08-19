import pathExists from 'path-exists';
import { resolve, join } from 'path';
import {
  existsSync,
  readdirSync,
  statSync,
  readFileSync,
} from 'fs';


/**
 * isDirectory()
 * @param {string} folderNamePath
 *
 */
const isDirectory = (folderNamePath) => {
  if (existsSync(folderNamePath)) {
    return false;
  }
  return true;
};

/**
 * For readAllFiles()
 * @param {String} path
 */
const readAllFiles = (path) => {
  const content = [];
  path = fixPath(path);
  const files = readdirSync(path);
  files.forEach((file) => {
    // @TODO I don't like this long line
    const fileStat = statSync(path + file).isDirectory();
    if (file.slice(-5) === '.json') {
      if (!fileStat) {
        let data = readFileSync(path + file);
        data = JSON.parse(data);
        content.push(data);
      }
    }
  });
  return content;
};

/**
 * For getListContent()
 * @param {String} path
 * @param {String} fileName
 */
const getListContent = (path, fileName = 'undefined') => {
  if (fileName === 'undefined') {
    // read all files
    return readAllFiles(path);
  }
  // read specified file
  let data = readFileSync(path + fileName);
  data = JSON.parse(data);
  return data;
};

/**
 * fixPath()
 * @param {String} path
 */
const fixPath = (path) => {
  path = resolve(__dirname, path);
  if (path.charAt(path.length - 1) !== '/') {
    path += '/';
  }
  return path;
};

/**
 * For getList()
 * @param {String} path
 */
const getList = (path) => {
  const list = [];
  const files = readdirSync(path);
  files.forEach((file) => {
    // @TODO I saw a similar line at method above
    const fileStat = statSync(path + file).isDirectory();
    if (!fileStat) {
      list.push(file);
    }
  });
  return list;
};

/**
 * For joinPath()
 * @param {Array} arr
 * @param {Bool} resolve
 */
const joinPath = (arr, useResolve = false) => {
  if (useResolve) {
    return resolve(...arr);
  }

  // @TODO i assume this is an else statement? confusing ...
  return join(...arr);
};

export default {
  readAllFiles,
  isDirectory,
  joinPath,
};
