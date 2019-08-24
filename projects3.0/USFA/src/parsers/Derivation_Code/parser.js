import path from 'path';

// @TODO // we can use module resolver for this
import { parseDirectoryFiles } from '@groceristar/food-dataset-csv-parser';
// import { parseDirectoryFiles, getHeaders } from '@groceristar/food-dataset-csv-parser'
// const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv');

const headers = ['derivation_code', 'Derivation_Descript'];

// @TODO changes required.
// we can use module resolver for this
const directory = '../../../raw/Derivation_Code_Description';

// joining path of directory
const directoryPath = path.join(__dirname, directory);

// @TODO I don't like that this scripts are
// called as it is... looks un-cool
parseDirectoryFiles(directoryPath, headers);
