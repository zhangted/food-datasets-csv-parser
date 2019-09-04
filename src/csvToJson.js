import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { resolve } from 'path';
// @TODO soon we'll replace it carefully
// with similar code from generator that was perfected and clean up
// https://github.com/GroceriStar/food-datasets-csv-parser/issues/23
import { write } from '@groceristar/static-data-generator';
import { joinPath } from './utils';

// @TODO I don't like how this file was previously created.
// I mean why we have this variables from the outside of our functions,
// is there some intersections, etc.
// I think we can improve it very easy.


// @TODO I don't like that we have 5 attributes at this method. it become complicated
// we need to figure out the way how to do it
const generate = (file, data) => {
  // @TODO change that
  // we can also create a method for path.join, so it wouldn't complicate our code
  // really bad line

  // file => [full directory path, 'filename', 'filetype']
  const folderName = file[0].split('/').slice(-1)[0] //gets folder name from full directory path
  const jsonFileName = `${folderName}/${file[1]+'.'+file[2]}${i}.json`;
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
  for (let i = 0; i < fileCount; i += 1) {
    start = i * maxEntriesPerFile;
    if (i + 1 === fileCount) {
      stop = dataEntries.length - 1;
    } else {
      stop = ((i + 1) * maxEntriesPerFile) - 1;
    }
    const jsonObjects = dataEntries.slice(start, stop);
    file[1] += i //add i to file name
    generate(file, jsonObjects);
    file[1] = file[1].slice(0,-1) //delete i from file name so nxt file can have proper i
  }
};

// @TODO
// I don't like the name for this method and for the whole file
// if it's main - then let's put it into index.js
// @TODO when we'll have getHeaders method working, should we call it inside of this method?
const csvToJson = (file, headers) => {
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
  const jsonFilePath = resolve(__dirname, `${file[0]}/${file[1]+'.'+file[2]}`);

  // -->
  createReadStream(jsonFilePath)
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
      assign(file, dataEntries);
    });
};

export default csvToJson;
