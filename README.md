# food-datasets-csv-parser

[![Maintainability](https://api.codeclimate.com/v1/badges/1ec3613f4b74a3742e18/maintainability)](https://codeclimate.com/github/GroceriStar/food-datasets-csv-parser/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1ec3613f4b74a3742e18/test_coverage)](https://codeclimate.com/github/GroceriStar/food-datasets-csv-parser/test_coverage)
[![Build Status](https://travis-ci.org/GroceriStar/food-datasets-csv-parser.svg?branch=master)](https://travis-ci.org/GroceriStar/food-datasets-csv-parser)

#### Stretch goals

- [x] Husky
- [x] Lint-Staged
- [ ] Travis CI
- [ ] index.js as main point
- [ ] created great test coverage
- [ ] Extend Travis CI script: when new module released, it should work well with our projects3.0 automatically

- [ ] check if we can use checkFilePath from generator
- [ ] find out, what methods should be removed from utils.js, because they are duplicates from
- [ ] ESLint for projects2.0, projects3.0 folder. now it's disabled

#### scripts for testing few of our parsers - old, very old and new one

**Note:** I didn't test them here(at separated place).
And i also think that projects should evolve in order to get able to use `csv_parser` as separated entity correctly.

**FoodComposition** it is our first dataset that we actually parsed before, when this module was part of [sd module](https://github.com/GroceriStar/sd/) repository codebase.
That code was working before. It can be an example of how we calling methods from `src` folder.
When data was parsed. It calling methods from our another module - [generator module](https://github.com/GroceriStar/food-static-files-generator)

You can find how we execute this script at package.json

```
"csv:fc"    - FoodComposition,
```

**USFA** is a second, separated dataset that we should parse

below is a list to script that executing parser for different CSV files that we have.

```
"csv:usfa1" - USFA/Derivation_Code_Description
"csv:usfa2" - USFA/Nutrition
"csv:usfa3" - USFA/Product
"csv:usfa4" - USFA/ServingSize
```

**FAO** is a third dataset. I think we didn't start to create a parse file for it.

---

## Quick Start

Several quick start options are available:

- Clone the repo: `git clone https://github.com/GroceriStar/food-datasets-csv-parser.git`
- Install with npm: `npm install @groceristar/food-datasets-csv-parser`
- Install with yarn: `yarn add @groceristar/food-datasets-csv-parser`

#### Parser commands

- `npm run parseCsv` or `yarn parseCsv` : parse from csv to json Food Composition

## How to split json into single elements

To split json file you will require `sd/generator/writeFile.js` .
Call the function **splitObject()** with parameters `path`(as string),`filename`(as string) and a `flag`(0 or 1).
`Flag=0` means splitted elements are to be name after the `name` attribute and if `flag=1` then elements will be give named by a number with removed whitespaces and in lowercase to maintain uniformity.
The splitted elements will be stored at the given `path`/`filename_elements`.


### How to parse csv File(s) from a folder to to json file(s)

Create a folder you want the generated json file(s) to be.
Also create a parser.js file in the created folder.
In csvParser.js call `ParseDirectoryFiles()` from csvParser.js with
parameters `directoryPath` (the folder to read your csv file(s) from) as string,
and headers (the header of the csv files ) as array of string.

**In csvParser.js**

```
ParseDirectoryFiles(directoryPath, headers)
  => csvToJson(directory, file, headers)
      => assign(fileName, dataEntries)
        => generate(i, fileName, data)
```

`ParseDirectoryFiles` gets a directory path from call, then chunks the information for each file into 3 parts:  the directory path, file name, and file type. They are stored in `fileInfo` at index 0, 1, and 2.
If `fileInfo[2]` is `csv`, then `fileInfo` is passed in `csvToJson(fileInfo, headers)`.  
Each csv file is passed into `csvParser()`.

#### `parseCsv()` require csv-Parser modules
asynchronous function that can parse csv files
```
/**
 * parse csv files
 * @async
 * @param {string} path - The path of the csv file
 * @param {opts} opts - optional options object for csv-parser package
 * @returns {Promise<string[]>} Promise
 */
```

#### `csvToJson()` require csv-Parser modules`
Fill `dataEntries` array with all csv entries => Total entries in csv file/10,000 entries per json file => gets number of json files to be generated

#### `assign( fileName, dataEntries )`
Total entries in csv file/10,000 entries per json file => gets number of json files to be generated => store in `fileCount`. For each file, calculate start/stop indexes (0-9999,10000-19999, 20000-29999..) based on max entries per file (10000). For the last file, the `stop` index will be the length of `dataEntries` - 1, because it is unlikely it will end on a perfect multiple of `maxEntriesPerFile`. Creates sliced array called `jsonObjects` from `dataEntries[start]` to `dataEntries[stop]`. The current file number (`i`), the `fileName`, and `jsonObjects` are passed to `generate` to make the file.

#### `generate( i, fileName, data )`– requires writeFile from sd/generator to work.
Writes sliced array `data` to json file named `fileName+i`

### ES5 and ES6 simple differences reference

1. [https://engineering.carsguide.com.au/es5-vs-es6-syntax-6c8350fa6998](https://engineering.carsguide.com.au/es5-vs-es6-syntax-6c8350fa6998)

### `food-datasets-csv-parser/src` directory structure

```
.
├── CCCSVParser.js
├── FoodComposition
│   ├── FoodComposition\ -\ Finland.json
│   ├── FoodComposition\ -\ France.json
│   ├── FoodComposition\ -\ Germany.json
│   ├── FoodComposition\ -\ Italy.json
│   ├── FoodComposition\ -\ Netherlands.json
│   ├── FoodComposition\ -\ Sweden.json
│   ├── FoodComposition\ -\ United\ Kingdom.json
│   ├── FoodComposition.json
│   ├── csv_parser.js
│   └── files.js
├── USFA
│   ├── Derivation_Code_Description
│   │   ├── Derivation_Code_Description1.json
│   │   └── parser.js
│   ├── Nutrition
│   │   ├── Nutrient01.json
│   │   ├── files.js
│   │   └── parser.js
│   ├── Product
│   │   ├── Products01.json
│   │   └── parser.js
│   ├── Readme.md
│   ├── Serving_Size
│   │   ├── Serving_Size1.json
│   │   └── parser.js
│   └── files.js
├── fileSystem.js
├── index.js
├── utils.js
└── writeFile.js
```

## Methods from this module

#### generate

```

```

#### WriteInFile

```

```

#### assign

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

#### How to create parser for FAO dataset from scratch

it should be a pretty similar work that we've made with FoodComposition data and USFA data as well.
we just have a different dataset, with different headers and files,
stored here: https://github.com/ChickenKyiv/awesome-food-db-strucutures/tree/master/FAO

logic is simple - it should have a similar structure as USFA has and similar parser files logic is simple - it should have a similar structure as USFA has and similar parser files

1st generation of parser scripts is related to **Food composition** and located at [folder](https://github.com/GroceriStar/food-datasets-csv-parser/tree/master/src/FoodComposition)

example of 2nd gen parser script is [here](https://github.com/GroceriStar/food-datasets-csv-parser/tree/master/src/USFA)

> Where should I write parser for FAO?

For now, use the same logic as we have at this repository,
i.e. at `src` folder you can see now 3 folder that are our folders for storing data and parsers from different dataset.
It's our old logic of locating files. Later we'll move all projects our from `src` folder.
I created `projects3.0` - we'll move there our code later when it will work at least partially.

> What we should do in order to create a parser, related to FAO dataset from scratch?

**Keep in mind that part of these was actually completed**

- [x] create a folder with name FAO
- [x] copy any parser.js from USFA project
- [x] upload to that folder csv files from https://github.com/ChickenKyiv/awesome-food-db-strucutures/tree/master/FAO
- [ ] for each "table" - each file with exported data are actually a table from database. For each "table" you should create separated folders, like we did in USFA case.
- [ ] for each "table" you should have a separated file parser.js that will be a script that we call for parsing each table
- [ ] you can add a line at package.json so you'll be able to call your script(right now it wouldn't work, but soon, we'll finish other changes that will help to make this parsers work)

> It looks like these .csv files have many headers.
> Whereas in the USFA version, you could easily hardcode the headers and pass them as the second argument to parseDirectoryFiles(),
> here I will need to dynamically obtain the headers from each file.

For this kind of problem we created a new method, that should be tested and used.
it's called `getHeaders` and located [here](https://github.com/GroceriStar/food-datasets-csv-parser/blob/master/src/getHeaders.js)
We didn't battle-tested it. So if `getHeaders` require changes - it's ok.
