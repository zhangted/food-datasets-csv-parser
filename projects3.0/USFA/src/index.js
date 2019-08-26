// import _ from 'lodash';

// import { csvToJson, parseDirectoryFiles } from '@groceristar/food-dataset-csv-parser';

// import { Nutrient, Derivation_Code, Product, Serving_Size } from '@files';

import {
  parserUSFADerivationCode,
  parserUSFANutrition,
  parserUSFAProduct,
  parserUSFAServingSize,
} from '@files';

// import { __generateId, __generateDate } from '@utils';

parserUSFADerivationCode();

export {
  parserUSFADerivationCode,
  parserUSFANutrition,
  parserUSFAProduct,
  parserUSFAServingSize,
};
