const csvToJson = require('csvToJson');

const getHeaders = async (path) => {
  const dataset = await csvToJson().fromFile(path);
  const headers = Object.keys(dataset[0]);

  return headers;
};

module.exports = getHeaders;
