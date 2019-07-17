const csv = require('csvtojson')

const getHeaders = async path => {
  const data = await csv().fromFile(path)
  const headers = Object.keys(data[0])

  return headers
}

module.exports = getHeaders
