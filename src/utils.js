const pathExists = require('path-exists');
const {
  existsSync,
  readdirSync,
  statSync,
  readFileSync,
} = require('fs');
const { resolve, join } = require('path');

async function checkFilePath (path) {
  if (await pathExists(path)) {
    console.log('Filepath ' + path + ' exist')
  } else {
    console.log('Filepath ' + path + ' doesn`t exist')
  }
}

/* global describe, it, expect */

/**
 * isDirectory()
 * @param {string} folderNamePath
 *  */
function isDirectory (folderNamePath) {
  if (existsSync(folderNamePath)) {
    return false
  }
  return true
}

/**
 * For readAllFiles()
 * @param {String} path
 */
function readAllFiles (path) {
  var content = []
  path = fixPath(path)
  var files = readdirSync(path)
  files.forEach(file => {
    // @TODO I don't like this long line
    const fileStat = statSync(path + file).isDirectory()
    if (file.slice(-5) === '.json') {
      if (!fileStat) {
        var data = readFileSync(path + file)
        data = JSON.parse(data)
        content.push(data)
      }
    }
  })
  return content
}

/**
 * For getListContent()
 * @param {String} path
 * @param {String} fileName
 */
function getListContent (path, fileName = 'undefined') {
  if (fileName === 'undefined') {
    // read all files
    return readAllFiles(path)
  }
  // read specified file
  let data = readFileSync(path + fileName)
  data = JSON.parse(data)
  return data
}

/**
 * fixPath()
 * @param {String} path
 */
function fixPath (path) {
  path = resolve(__dirname, path)
  if (path.charAt(path.length - 1) !== '/') {
    path = path + '/'
  }
  return path
}

/**
 * For getList()
 * @param {String} path
 */
function getList (path) {
  var list = []
  var files = readdirSync(path)
  files.forEach(file => {
    // @TODO I saw a similar line at method above
    const fileStat = statSync(path + file).isDirectory()
    if (!fileStat) {
      list.push(file)
    }
  })
  return list
}

/**
 * For getFileInfo()
 * @param {String} path
 * @param {var} flag
 * @param {String} fileName
 */
function getFileInfo (path, flag = 0, fileName = 'undefined') {
  /*
      flag = 1 --> means return content
      if file name is given then content of that file else return content of all files.
      only path is given( flag=0 )--> give list of all files in directory.
    */
  path = fixPath(path)

  // @TODO can be replaced with ternary operator
  if (flag === 1) {
    // get content from file
    return getListContent(path, fileName)
  }
  // return list of files
  return getList(path)
}

/**
 * For joinPath()
 * @param {Array} arr
 * @param {Bool} resolve
 */
const joinPath = (arr, useResolve = false) => {

  if(useResolve) {
    return resolve(...arr);
  }

  return join(...arr);
}


module.exports = {
  checkFilePath,
  getFileInfo,
  readAllFiles,
  isDirectory,
  joinPath,
}
