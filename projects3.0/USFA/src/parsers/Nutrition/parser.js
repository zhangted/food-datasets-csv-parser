import { join } from 'path';

import { parseDirectoryFiles } from '@groceristar/food-dataset-csv-parser';
// import { parseDirectoryFiles, getHeaders } from '@groceristar/food-dataset-csv-parser'

const parserUSFANutrition = () => {
  // const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv');

  const headers = [
    'NDB_No',
    'Nutrient_Code',
    'Nutrient_name',
    'Derivation_Code',
    'Output_value',
    'Output_uom',
  ];

  // @TODO changes required.
  // we can use module resolver for this
  const directory = '@raw/Nutrition';

  // joining path of directory
  const directoryPath = join(__dirname, directory);

  // @TODO I don't like that this scripts are called as it is... looks un-cool
  parseDirectoryFiles(directoryPath, headers);
};

export default parserUSFANutrition;
