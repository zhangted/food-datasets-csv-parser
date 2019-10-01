/* eslint-disable no-unused-vars */
import { write } from '@groceristar/static-data-generator';
// import { joinPath } from './utils';
import parseCsv from './parseCsv';

const generate = (file, data) => {
  // file => [full directory path, 'filename', 'filetype']
  const fileInfo = file;
  // @TODO duplicate, right? can we make it better?
  const fullPath = ''.concat(file[0], file[1], '.json');

  console.log('---file writer started---');
  console.log(fullPath);
  console.log('---file writer ended---');

  write(fullPath, data);
};

// @TODO update this method later, when we'll migrate to `write` from generator

// @TODO as this method using "generateJsonFiles" method - it should be updated.
// or maybe move it into generator file, etc.
const assign = (file, dataEntries) => {
  // @TODO add if env.development and use console.log(xxx)
  const maxEntriesPerFile = 10000;
  const fileCount = Math.ceil(dataEntries.length / maxEntriesPerFile);
  console.log('---assign started---');
  let start;
  let stop;
  const fileInfo = file;
  const savedFileName = fileInfo[1];
  for (let i = 0; i < fileCount; i += 1) {
    start = i * maxEntriesPerFile;
    if (i + 1 === fileCount) {
      stop = dataEntries.length - 1;
    } else {
      stop = (i + 1) * maxEntriesPerFile - 1;
    }
    const jsonObjects = dataEntries.slice(start, stop);
    fileInfo[1] += i.toString(); // add i to file name
    generate(fileInfo, jsonObjects);
    fileInfo[1] = savedFileName; // delete i from file name so nxt file can have proper i
  }
};

// @TODO
// I don't like the name for this method and for the whole file
// if it's main - then let's put it into index.js
const csvToJson = async (path, headers) => {
  // @TODO duplicate, right? can we make it better?
  const fullPath = ''.concat(path[0], path[1], '.csv');
  const data = await parseCsv(fullPath);
  assign(path, data);
};

export default csvToJson;
