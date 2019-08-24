/* global describe, it, expect */
const uuidv1 = require('uuid/v1');
const dayjs = require('dayjs');
const fs = require('fs');

/**
 * For readAllFiles()
 * @param {String} path
 */
function readAllFiles(path) {
  var content = [];
  var files = fs.readdirSync(path);
  files.forEach(file => {
    let fileStat = fs.statSync(path + file).isDirectory();
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
  if (path.charAt(path.length - 1) !== '/') path = path + '/';
  return path;
}

/**
 * For getList()
 * @param {String} path
 */
function getList(path) {
  var list = [];
  var files = fs.readdirSync(path);
  files.forEach(file => {
    let fileStat = fs.statSync(path + file).isDirectory();
    if (!fileStat) {
      list.push(file);
    }
  });
  return list;
}

const __generateId = () => {
  return uuidv1();
};

const __generateDate = () => {
  return dayjs().toDate();
};

module.exports = {
  __generateId,
  __generateDate
};
