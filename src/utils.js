// import pathExists from 'path-exists';
import { resolve, join } from 'path';
import {
  // existsSync,
  readdirSync,
  statSync,
  readFileSync
} from 'fs';

// import { fixPath } from 'generator'

/**
 * fixPath()
 * @param {String} path
 */
// @TODO this method is a duplicate at generator.
// not sure where we should keep it
// https://github.com/GroceriStar/food-static-files-generator/blob/master/src/utils.js#L33
const fixPath = filePath => {
  let newPath = resolve(__dirname, filePath);
  if (newPath.charAt(newPath.length - 1) !== '/') {
    newPath += '/';
  }
  return newPath;
};

/**
 * For readAllFiles()
 * @param {String} path
 */
const readAllFiles = path => {
  const content = [];
  const newPath = fixPath(path);
  const files = readdirSync(newPath);
  files.forEach(file => {
    // @TODO I don't like this long line
    const fileStat = statSync(newPath + file).isDirectory();
    if (file.slice(-5) === '.json') {
      if (!fileStat) {
        let data = readFileSync(newPath + file);
        data = JSON.parse(data);
        content.push(data);
      }
    }
  });
  return content;
};

/**
 * For getList()
 * @param {String} path
 */
const getList = path => {
  const list = [];
  const files = readdirSync(path);
  files.forEach(file => {
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

export { readAllFiles, joinPath, getList };
