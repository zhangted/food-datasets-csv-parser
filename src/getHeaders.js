const { createReadStream } = require('fs')
const csv = require('csv-parser')

// Pass in the path to the data from which you want to obtain the headers.
const getHeaders = path => {
  const results = []

  createReadStream(path)
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', () => {
      const headers = Object.keys(results[0])

      return headers
    })
}

module.exports = getHeaders
