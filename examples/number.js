'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: 'not_parsable_string',
  b: 2.5,
  c: 2.9,
  d: 2
};

const schema = Jdv.object().keys({
  a: Jdv.number('"a" must be a number'),
  b: Jdv.number('"b" must be a number')
    .min(0, '"b" must be grater than or equal to 0')
    .max(5.3, '"b" must be less than or equal to 5.3'),
  c: Jdv.number('"c" must be a number')
    .min(3.3, '"c" must be grater than or equal to 3.3')
    .max(5.6, '"c" must be less than or equal to 5.6'),
  d: Jdv.number('"d" must be a number')
    .min(0, '"d" must be grater than or equal to 0')
    .max(1.9, '"d" must be less than or equal to 1.9'),
  e: Jdv.number('"e" must be a number')
    .defaultsTo(23.45),
  f: Jdv.number('"f" must be a number')
    .required('"f" is required')
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// [
//   '"a" must be a number',
//   '"c" must be grater than or equal to 3.3',
//   '"d" must be less than or equal to 1.9',
//   '"f" is required'
// ]

console.dir(data);
// {
//   a: NaN,
//   b: 2.5,
//   c: 2.9,
//   d: 2,
//   e: 23.45
// }

process.exit(0);
