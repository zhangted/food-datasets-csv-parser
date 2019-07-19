// const filePath = require('../files')
import { writeFile, readFileSync, mkdirSync } from 'fs';
import PATH from 'path';
import srcUtils from './utils';
// const { promisify } = require('util') // ?? it's utils of not *** Answer : NO. It's using for writing data in json
// const { promisify } = require('util')
// const _ = require('lodash')

/**
 * for makeReadable()
 * @param {Object} data a json object
 * */
const makeReadable = (data) => {
  var dataStr = JSON.stringify(data)

  const replaceList = [
    [/{"/g, '{ "'],
    [/{"/g, '{ " '],
    [/},{/g, ' },\n{'],
    [/":/g, '": '],
    [/,"/g, ',\n "']
  ]

  replaceList.forEach((replacer) => {
    dataStr = dataStr.replace(replacer[0], replacer[1])
  })

  return dataStr
}

const write = (path, data) => new Promise((resolve) => {

  const dataStr = stripSymbols(data);

  writeFile(path, dataStr, (err) => {
    if (err) {
      console.log(err);
      resolve(false);
    } else {
      console.info(`${path} file generated successfully!`);
      resolve(true);
    }
  });
});

// execute function
// writeFiles()

/**
 * For fixPath()
 * @param {String} path
 */
const fixPath = (path) => {
  path = PATH.resolve(__dirname, path) // absolute path
  if (path[-1] !== '/') { path = path + '/' } // path correction
  return path
}

/**
 * readData()
 * @param {string} path
 * @param {string} file
 * */
const readData = (path, file) => {
  console.log(path + file)

  const data = fs.readFileSync(path + file)
  console.log(data)

  const fileData = JSON.parse(data)
  return fileData
}

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * */
const saveFile = (folderNamePath, file, fileData, flag) => {
  var fileDataLength = fileData.length
  for (var i = 0; i < fileDataLength; i++) {
    var fileName = getFileName(file, fileData[i], flag, i)
    var elementPath = folderNamePath + '/' + fileName
    write(elementPath, fileData[i])
  }
}

/**
 * @param {String} path
 * @param {String} file
 */
const makeFolder = (path, file) => {
  var folderName = file.slice(0, -5) + '_elements'
  var folderNamePath = path + folderName
  if (srcUtils.isDirectory(folderNamePath)) {
    fs.mkdirSync(folderNamePath)
  }
  return folderNamePath
}

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
  const file = PATH.basename(fullPath)
  let path = PATH.parse(fullPath).dir

  if (PATH.extname(file) !== '.json') {
    console.log('Require .json file.')
    return
  }

  path = fixPath(path)
  const fileData = readData(path, file) // Reading data...
  var folderNamePath = makeFolder(path, file) // new folder to save splitted files
  saveFile(folderNamePath, file, fileData, flag) // saving files

  if (callback instanceof Function) {
    setTimeout(function () {
      callback(folderNamePath, keys)
    }, 1000)
  }
}

/**
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  fileName = fileName.replace(/ /g, '_') // Replace space with underscore
  fileName = fileName.toLowerCase() // Maintain Uniformity
  return fileName
}

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
const getFileName = (file, fileData, flag, index) => {
  var fileName
  if (flag === 1) fileName = index + '-' + file // for example: 23-someJsonFile.json
  else fileName = fileData.name + '.json' // for example: someValueOfName.json
  fileName = fixFileName(fileName)
  return fileName
}

/**
 * For combineObjects()
 * @param {String} path Path of folder where all splitted files are stored
 * @param {var} keys List of keys that are to be removed
 */
const combineObject = (path, keys) => {
  path = fixPath(path)
  var content = srcUtils.readAllFiles(path) // read all json files
  content = updateContent(content, keys) // modifying structure
  var fileNamePath = path + PATH.basename(path) + '_combined.json' // for example: elements_combined.json
  write(fileNamePath, content) // saving
}

/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  content.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key]
      })
    })
  })
  return content
}

export default {
  write,
  splitObject,
  combineObject,
  makeReadable,
  readData
}
