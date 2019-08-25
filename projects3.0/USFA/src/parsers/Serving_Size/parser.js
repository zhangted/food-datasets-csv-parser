import { join } from 'path';

import { parseDirectoryFiles } from '@groceristar/food-dataset-csv-parser';
// import { parseDirectoryFiles, getHeaders } from '@groceristar/food-dataset-csv-parser'

const parserUSFAServingSize = () => {
  // const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv');

  const headers = [
    'NDB_No',
    'Serving_Size',
    'Serving_Size_UOM',
    'Household_Serving_Size',
    'Household_Serving_Size_UOM',
  ];

  // @TODO changes required
  const directory = '@raw/Serving_Size';

  // joining path of directory
  const directoryPath = join(__dirname, directory);

  // @TODO I don't like that this scripts are called as it is... looks un-cool
  parseDirectoryFiles(directoryPath, headers);
};

export default parserUSFAServingSize;
