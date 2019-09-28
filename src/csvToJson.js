/* eslint-disable no-unused-vars */
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { resolve as resolvePath } from 'path';
// @TODO soon we'll replace it carefully
// with similar code from generator that was perfected and clean up
// https://github.com/GroceriStar/food-datasets-csv-parser/issues/23
import { write } from '@groceristar/static-data-generator';
import { joinPath } from './utils';

// @TODO I don't like how this file was previously created.
// I mean why we have this variables from the outside of our functions,
// is there some intersections, etc.
// I think we can improve it very easy.

const generate = (file, data) => {
  // file => [full directory path, 'filename', 'filetype']
  const fileInfo = file;
  const fullPath = ''.concat(file[0],  file[1], '.json');
  // Why use USFA when jsonFileName already has the folderName in it.
  // Can jsonFileName and jsonPath possibly be merged?
  console.log('---file writer started---');
  console.log(fullPath);
  console.log('---file writer ended---');

  // --> if you reading it - then it's time for updating it :)

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
// @TODO when we'll have getHeaders method working, should we call it inside of this method?
const csvToJson = (path, fileInfo, headers) => {
  // @TODO should we have this const at this method? maybe just init it at next methods?
  // it should reduce number of arguments

  // <--

  // @TODO can we also path a variable that combine `${directory}/${file}` together?
  // i mean maybe we can pass into csvToJson one argument instead of two?

  // @TODO I still think that it will be a good task
  // to move out this long `thing` into separated method

  // @TODO maybe we should move this 4 lines into a separated method?

  const dataEntries = [];
  // file => [full directory path, 'filename', 'filetype']
  var fullPath = ''.concat(fileInfo[0], fileInfo[1], '.', fileInfo[2]);
  // @TODO This line looks complicated for me. We need to update that later.
  // maybe we can move out this line into a separated method.
  // const jsonFilePath = resolve(__dirname, `${file[0]}/${file[1]}.${file[2]}`);

  // -->

  return new Promise((resolve, reject) => {
    // @TODO can we have a separated method that will contain all this createReadStream long code?
    // we have a method that does it, please find it and make something similar
    createReadStream(path)
      .pipe(
        csv({
          skipLines: 1,
          headers,
        }),
      )
      .on('data', (data) => {
        dataEntries.push(data);
      })
      .on('end', () => {
        resolve(dataEntries);
      })
      .on('error', (err) => {
        reject(err);
      });
  });

};

export default csvToJson;
