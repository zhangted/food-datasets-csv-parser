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

const maxEntries = 10000;
let result = [];
let folderName;
let numberOfFiles;

// @TODO change the name
const fileWriter = (i, fileName, start, stop) => {
  const data = result.slice(start, stop);

  // @TODO change that. it will work only for one case.
  // we can also create a method for path.join, so it wouldn't complicate our code
  // really bad line
  const jsonPath = `/projects/USFA/${folderName}/${fileName}${i}.json`;
  const combinedPath = joinPath([__dirname, jsonPath]);
  // --> if you reading it - then it's time for updating it :)

  write(combinedPath, data);
};

// @TODO update this method later, when we'll migrate to `write` from generator

const splitJsonIntoFiles = (fileName) => {
  for (let i; i <= numberOfFiles; i += 1) {
    const start = (i - 1) * maxEntries;
    let stop = i * maxEntries;

    if (i === numberOfFiles) {
      stop = result.length + 1;
      fileWriter(i, fileName, start, stop);
      return;
    }

    // @TODO is this related to else statemtn? confusing ...
    fileWriter(i, fileName, start, stop);
  }
};

// @TODO This is our main method here, right?
// I don't like the name for this method and for the whole file
// if it's main - then let's put it into index.js
const csvToJson = (directory, file, headers) => {
  // @TODO can this be a separated method?
  const fileName = file.split('.')[0];
  const results = [];
  const folder = directory.split('/');

  folderName = folder[folder.length - 1];
  // <--
  // @TODO it's a very long path. we can use our aliases
  // in order to make it shorter. check readme https://github.com/GroceriStar/sd/tree/master/docs#babel-alias

  // @TODO can we also path a variable that combine `${directory}/${file}` together?
  // i mean maybe we can pass into csvToJson one argument instead of two?

  // @TODO I still think that it will be a good task
  // to move out this long `thing` into separated method
  createReadStream(resolve(__dirname, `${directory}/${file}`))
    .pipe(
      csv({
        skipLines: 1,
        headers,
      }),
    )
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      numberOfFiles = Math.ceil(results.length / maxEntries);
      result = results;
      splitJsonIntoFiles(fileName);
    });
};

export default csvToJson;
