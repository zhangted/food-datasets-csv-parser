// // import { joinPath } from '../src/utils';
//
// @TODO add here a list of scripts that can be run shx or shelljs thing
// Example from our other scripts that we call in nodejs
//
// at this file we'll run nodejs command
var shell = require('shelljs')
const _ = require('lodash')
const pkg = require './package.json';

const parserScripts = _.pickBy(pkg.scripts, function(value, key) {
 return _.startsWith(key, "csv");
});
console.log(parserScripts)

// _.forEach(parserScripts, function (key) {
//   try {
// can be broken if yarn not installed
//     shell.exec('yarn  ' + parserScripts[key], { silent: true })
//   } catch (e) {
//     console.log(e)
//   }
// }

// This version below looks better for me
// // Check if path exist
// // @TODO lodash
// Object.keys(jsonFiles).forEach(function (key) {
//   if (shell.test('-e', jsonFiles[key])) {
//     // console.log("File exist " + jsonFiles[key]);
//   } else {
//     // console.log("File doesn't exist " + jsonFiles[key]);
//   }
// })


// "parse:FoodComposition": "node ./runner/parseFoodComposition",
// "debug:FoodComposition": "npm run build && node ./debug/parseFoodComposition",
// "csv:fc": "node ./projects2.0/FoodComposition/parser",
// "csv:usfa1": "node ./projects2.0/USFA/Derivation_Code_Description/parser",
// "csv:usfa2": "node ./projects2.0/USFA/Nutrition/parser",
// "csv:usfa3": "node ./projects2.0/USFA/Product/parser",
// "csv:usfa4": "node ./projects2.0/USFA/Serving_Size/parser",
// "csv:fish_reftbl": "node ./projects2.0/FAO/Fish/Fish_Reftbl_RefDatasets/parser",
// "csv:fao1": "node ./projects2.0/FAO/Fish/Fish_NV_Sum/parser"

//
// // @TODO add here all new generated at generator files too
// // @TODO looks like jsonlint doesnt called without build... strange
// const jsonFiles = require('./src/files.js')
//
// // each can be used instead of forEach
// // @TODO replace with lodash
// _.forEach(Object.keys(jsonFiles), function (key) {
//   try {
//     shell.exec('jsonlint ' + jsonFiles[key], { silent: true })
//   } catch (e) {
//     console.log(e)
//   }
//
//   // // Run external tool synchronously
//   // if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
//   //   shell.echo('Error: Git commit failed');
//   //   shell.exit(1);
//   // }
// })
//
