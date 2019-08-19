// Here I want to put all methods, related to reading data, etc.
import { readdir } from 'fs';
import { csvToJson } from './index';

// @TODO there was an idea to replace console.log with other ways to log thigns

const parseDirectoryFiles = (directoryPath, headers) => {
  // passing directoryPath and callback function
  readdir(directoryPath, (err, files) => {
    // handling error
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    // listing all files using forEach
    files.forEach((file) => {
    // Do whatever you want to do with the file
      console.log(file, typeof file);
      if (file.split('.')[1] === 'csv') {
        csvToJson(directoryPath, file, headers);
      }
    });
  });
};


/**
 * isFolderExists prev. isDirectory()
 * @param {string} folderNamePath
 *
 */
const isFolderExists = (folderNamePath) => {
  if (existsSync(folderNamePath)) {
    return false;
  }
  return true;
};

// export default parseDirectoryFiles;
export {
  parseDirectoryFiles,
  isDirectory
};
