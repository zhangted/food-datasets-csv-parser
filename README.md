# food-datasets-csv-parser

[![Maintainability](https://api.codeclimate.com/v1/badges/1ec3613f4b74a3742e18/maintainability)](https://codeclimate.com/github/GroceriStar/food-datasets-csv-parser/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1ec3613f4b74a3742e18/test_coverage)](https://codeclimate.com/github/GroceriStar/food-datasets-csv-parser/test_coverage)

- ESLint
- Husky
- Lint-Staged
- Travis CI

- index.js as main point
- test coverage
- remove standard



## Quick Start
Several quick start options are available:
* Clone the repo: `git clone https://github.com/GroceriStar/food-datasets-csv-parser.git`
* Install with npm: `npm install @groceristar/food-datasets-csv-parser`
* Install with yarn: `yarn add @groceristar/food-datasets-csv-parser`



#### Parser commands
- `npm run parseCsv` or `yarn parseCsv` : parse from csv to json Food Composition



## How to split json into single elements
To split json file you will require `sd/generator/writeFile.js` . Call the function **splitObject()** with parameters `path`(as string),`filename`(as string) and a `flag`(0 or 1).
`Flag=0` means splitted elements are to be name after the `name` attribute and if `flag=1` then elements will be give named by a number with removed whitespaces and in lowercase to maintain uniformity.
The splitted elements will be stored at the given `path`/`filename_elements`.

**splitObject('path_of_directory','fileName',0)** - split files by their name attribute.

**splitObject('path_of_directory','fileName',1)** - split files by indexing them from 0.

Checkout the folder `fileName_elements` in the `path_of_directory` to see files or you can use function `getFileInfo()`.

To  call the function `getFileInfo(path,flag,fileName)` you will require `sd/src/utils.js`. It can be invoked with 3 parameteres and 2 of them are optional depending on task. First parameter is `path` and it is required for functionality. The second and third parameters are `flag` and `fileName`.

If `flag=1` it will return the content of all files present in the path else if `fileName` is given then it will return the content of the specified file.

If there is only one parameter that is `path` or with `flag=0` it will return list of all files present in the directory.

You can combine objects by calling function **combineObjects()** from writeFile.js. It takes 2 parameters `path` and list of `keys_to_be_removed`.

**combineObject(path, keys_to_be_removed)** - This will read all files in the given path and remove the keys given the list of keys_to_be_removed and saves it into a new file in the given `path` as name `<dirName>_combined.json`.

Example:- combineObject('/abc/pqr/', ['id', 'img'])

If you want to modify the json structure of splitted files and combine them again to a single file then you can call splitObject with a call back function.



### How to parse csv File(s) from a folder to to json file(s)
Create a folder you want the generated json file(s) to be. Also create a parser.js file in the created folder.
In csvParser.js call `ParseDirectoryFiles()` from csvParser.js with parameters `directoryPath` (the folder to read your csv file(s) from) as string, and headers (the header of the csv files ) as array of string.

In csvParser.js
```
ParseDirectoryFiles(directoryPath, headers)
  => csvToJson(directory, file, headers)
      => splitJsonFile(fileName)
        => filewriter(i, fileName, start, stop)
```


`ParseDirectoryFiles` gets a directory path from call, and reads all files in the directory but will only pass csv files to `csvToJson(directory, file, headers)`.
Each csv file is passed into `csvParser()``.


#### `csvToJson` require csv-Parser modules
`csvToJson ()` --get the file directory path, filename(file) and headers and generate a Json file for the csv files using the headers as keys.
The JSON file generated is stored in variable result.
File Name is passed is to `splitJsonFile(file)`` to keep track of the file being

- variable `numberOfFile` stores the number of JSON files to get from JSON stored in result. So that each JSON file has maximium entry of 10000 stored in variable maxEntries.
`Filewriter` function is called inside the `splitJsonFile` function

#### `filewriter()` – requires writeFile from sd/generator to work.
It takes in the child number of the json file( i ) ,the file name( fileName ),the interval the json stored in result should start and stop slicing. The sliced data will be written into the folder calling `parserFile` function along side file name being parsed and the child number of the file.



#### Methods

#### fileWriter
```
```
#### WriteInFile
```
```
#### splitJsonIntoFiles
```
```
#### csvToJson
```
```
#### parseDirectoryFiles
```
```
#### parseFoodComposition
```
```

#### makeReadable
```
```
#### writeFile
```
```
#### fixPath
```
```
#### readData
```
```
#### saveFile
```
```
#### makeFolder
```
```
#### combineObject
```
```
#### splitObject
```
```
