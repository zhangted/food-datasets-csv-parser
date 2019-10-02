import { createReadStream } from 'fs';
import csv from 'csv-parser';

/**
 * parse csv files
 * @async
 * @param {string} path - The path of the csv file
 * @param {options} options - optional options object for csv-parser package
 * @returns {Promise<string[]>} Promise
 */

function parseCsv(path, options) {
  const dataEntries = [];

  return new Promise((resolve, reject) => {
    createReadStream(path)
      .pipe(csv(options))
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
}

export default parseCsv;
