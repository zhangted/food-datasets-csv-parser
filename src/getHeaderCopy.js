// This version will be used, when we totally move into new version of our module.

import { csvToJson } from './index';

const getHeaders = async (path) => {
  const dataset = await csvToJson().fromFile(path);
  const headers = Object.keys(dataset[0]);

  return headers;
};

export default {
  getHeaders,
};
