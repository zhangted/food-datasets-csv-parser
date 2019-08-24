/* global describe, it, expect */
const uuidv1 = require('uuid/v1');
const dayjs = require('dayjs');
const fs = require('fs');

/**
 * For readAllFiles()
 * @param {String} path
 */
function readAllFiles(path) {
  const content = [];
  const files = fs.readdirSync(path);
  files.forEach(file => {
    const fileStat = fs.statSync(path + file).isDirectory();
    if (!fileStat) {
      let data = fs.readFileSync(path + file);
      data = JSON.parse(data);
      content.push(data);
    }
  });
  return content;
}

/**
 * fixPath()
 * @param {String} path
 */
function fixPath(path) {
  if (path.charAt(path.length - 1) !== '/') path += '/';
  return path;
}

/**
 * For getList()
 * @param {String} path
 */
function getList(path) {
  const list = [];
  const files = fs.readdirSync(path);
  files.forEach(file => {
    const fileStat = fs.statSync(path + file).isDirectory();
    if (!fileStat) {
      list.push(file);
    }
  });
  return list;
}

const __generateId = () => uuidv1();

const __generateDate = () => dayjs().toDate();

module.exports = {
  __generateId,
  __generateDate
};
