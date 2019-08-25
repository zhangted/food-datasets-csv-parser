import { join } from 'path';

import { parseDirectoryFiles } from '@groceristar/food-dataset-csv-parser';
// import { parseDirectoryFiles, getHeaders } from '@groceristar/food-dataset-csv-parser'

const parserUSFAProduct = () => {
  // const headers = getHeaders('./Fish_NV_sum (per 100 g EP).csv');

  const headers = [
    'NDB_Number',
    'long_name',
    'data_source',
    'gtin_upc',
    'manufacturer',
    'date_modified',
    'date_available',
    'ingredients_english',
  ];

  // @TODO changes required.
  // we can use module resolver for this

  const directory = '@raw/Product';

  // joining path of directory
  const directoryPath = join(__dirname, directory);

  // @TODO I don't like that this scripts are called as it is... looks un-cool
  parseDirectoryFiles(directoryPath, headers);
};

export default parserUSFAProduct;
