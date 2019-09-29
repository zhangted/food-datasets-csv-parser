// Here I want to put all methods, related to reading data, etc.
import { readdir } from 'fs';
import csvToJson from './csvToJson';

// @TODO there was an idea to replace console.log with other ways to log thigns
// @TODO I don't like the logic of this method.
// i think we can rewrite it and make better.
// logic of method =>split file name into its name + type =>
// add directoryPath to the array[0] => pass as one array to csvToJson
const parseDirectoryFiles = (directoryPath, headers) => {
  // passing directoryPath and callback function
  console.log('-- 1. starting of the method --');
  readdir(directoryPath, (err, files) => {
    // handling error
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    console.log('-- 2. before forEach --');
    // listing all files using forEach
    files.forEach((file) => {
      // Do whatever you want to do with the file
      console.log(file, typeof file);

      let fileInfo = file.split('.'); // => ['name', 'type']
      fileInfo = [directoryPath, ...fileInfo]; // => ['dirPath', 'name', 'type']
      if (fileInfo[2] === 'csv') {
        console.log('-- before csvToJson --');
        csvToJson(fileInfo, headers);
      }
    });
    return true;
  });
};

export default parseDirectoryFiles;
