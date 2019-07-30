import csv from './csvToJson';

const getHeaders = async (path) => {
  const data = await csv().fromFile(path);
  const headers = Object.keys(data[0]);

  return headers;
};

export default {
  getHeaders
};
