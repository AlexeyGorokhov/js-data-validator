'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: 'not_parsable_string',
  b: 2,
  c: 2,
  d: 2
};

const schema = Jdv.object().keys({
  a: Jdv.integer('"a" must be an integer'),
  b: Jdv.integer('"b" must be an integer')
    .min(0, '"b" must be grater than or equal to 0')
    .max(5, '"b" must be less than or equal to 5'),
  c: Jdv.integer('"c" must be an integer')
    .min(3, '"c" must be grater than or equal to 3')
    .max(5, '"c" must be less than or equal to 5'),
  d: Jdv.integer('"d" must be an integer')
    .min(0, '"d" must be grater than or equal to 0')
    .max(1, '"d" must be less than or equal to 1'),
  e: Jdv.integer('"e" must be an integer')
    .defaultsTo(23),
  f: Jdv.integer('"f" must be an integer')
    .required('"f" is required')
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// [
//   '"a" must be an integer',
//   '"c" must be grater than or equal to 3',
//   '"d" must be less than or equal to 1',
//   '"f" is required'
// ]

console.dir(data);
// {
//   a: NaN,
//   b: 2,
//   c: 2,
//   d: 2,
//   e: 23
// }

process.exit(0);
