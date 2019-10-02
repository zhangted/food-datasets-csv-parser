tmp.push(data);

let countriesArr = [
  'Finland',
  'France',
  'Germany',
  'Italy',
  'Netherlands',
  'Sweden',
  'United Kingdom'
];
results = _.map(tmp, obj => {
  const country = _.sample(countriesArr);
  obj.country = country;

  return obj;
});
