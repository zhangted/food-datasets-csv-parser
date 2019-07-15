// Here I want to put all methods, related to reading data, etc.
// like
import { readdir } from 'fs';
import csvToJson from './csvToJson';

const parseDirectoryFiles = (directoryPath, headers) => {
  // passing directoryPath and callback function
  readdir(directoryPath, function (err, files) {
  // handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    // listing all files using forEach
    files.forEach(function (file) {
    // Do whatever you want to do with the file
      console.log(file, typeof file)
      if (file.split('.')[1] === 'csv') {
        csvToJson(directoryPath, file, headers)
      }
    })
  })
}

export {
  parseDirectoryFiles,
}
