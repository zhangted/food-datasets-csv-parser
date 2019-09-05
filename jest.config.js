'use strict'

module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['json', 'lcov', 'text-summary', 'html'],
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '/dist/', 'examples', 'projects2.0', 'projects3.0'
  ],
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
