// Here I want to put all methods, related to reading data, etc.
import { readdir, existsSync } from 'fs';
import csvToJson from './csvToJson';

// @TODO there was an idea to replace console.log with other ways to log thigns
// @TODO I don't like the logic of this method.
// i think we can rewrite it and make better.
// logic of method =>split file name into its name + type =>
// add directoryPath to the array[0] => pass as one array to csvToJson
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

      let fileInfo = file.split('.'); // => ['name', 'type']
      fileInfo = [directoryPath, ...fileInfo]; // => ['dirPath', 'name', 'type']
      if (fileInfo[2] === 'csv') {
        csvToJson(fileInfo, headers);
      }
    });
    return true;
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
export { parseDirectoryFiles, isFolderExists };
