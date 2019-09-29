// This version will be used, when we totally move into new version of our module.

import parseCsv from './parseCsv';

// @TODO later i will want to have more options for this method.
// 1. I plan to store csv files at `raw` folder
// 2. I plan to generate json files into 'data' folder
// 3. i don't think that we should pass `.csv` extention.
// i mean all of our parsed files will be csv
// ----
// maybe, just maybe we should keep
// `getHeaders` as clean method but have another method that will reduce duplicates
const getHeaders = async (path) => {
  const dataset = await parseCsv(path);
  const headers = Object.keys(dataset[0]);

  return headers;
};

export default getHeaders;
