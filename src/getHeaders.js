// This version will be used, when we totally move into new version of our module.

import parseCsv from './parseCsv';

const getHeaders = async (path) => {
  const dataset = await parseCsv(path);
  const headers = Object.keys(dataset[0]);

  return headers;
};

export default getHeaders;
