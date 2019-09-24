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
  const folderName = fileInfo[0].split('/').slice(-1)[0]; // gets folder name from full directory path
  const jsonFileName = `${folderName}/${fileInfo[1]}.json`;
  // Why use USFA when jsonFileName already has the folderName in it.
  // Can jsonFileName and jsonPath possibly be merged?
  const jsonPath = `/projects/${jsonFileName}`;
  const combinedPath = joinPath([__dirname, jsonPath]);
  console.log('---file writer started---');
  console.log(folderName);
  console.log(jsonPath);
  console.log(combinedPath);
  console.log('---file writer ended---');

  // --> if you reading it - then it's time for updating it :)

  write(combinedPath, data);
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
  const savedFileName = file[1];
  for (let i = 0; i < fileCount; i += 1) {
    start = i * maxEntriesPerFile;
    if (i + 1 === fileCount) {
      stop = dataEntries.length - 1;
    } else {
      stop = (i + 1) * maxEntriesPerFile - 1;
    }
    const jsonObjects = dataEntries.slice(start, stop);
    fileInfo[1] += i.toString(); // add i to file name
    generate(file, jsonObjects);
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
  // const file = fileInfo;
  // file => [full directory path, 'filename', 'filetype']

  // @TODO This line looks complicated for me. We need to update that later.
  // maybe we can move out this line into a separated method.
  // const jsonFilePath = resolve(__dirname, `${file[0]}/${file[1]}.${file[2]}`);

  // -->

  return new Promise((resolve, reject) => {
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
