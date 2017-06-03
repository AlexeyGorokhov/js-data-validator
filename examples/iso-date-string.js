'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: '2017-06-03T15:34:23.345Z',
  b: '2017-06-03T15:34:23.345',
  c: '2017-06-03 15:34:23.345Z',
  d: '2017-16-03T15:34:23.345Z',
  e: '2017-06-03T15:61:23.345Z'
};

const schema = Jdv.object().keys({
  a: Jdv.ISODateString('"a" must be a correct ISO date string'),
  b: Jdv.ISODateString('"b" must be a correct ISO date string'),
  c: Jdv.ISODateString('"c" must be a correct ISO date string'),
  d: Jdv.ISODateString('"d" must be a correct ISO date string'),
  e: Jdv.ISODateString('"e" must be a correct ISO date string')
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// [
//   '"b" must be a correct ISO date string',
//   '"c" must be a correct ISO date string',
//   '"d" must be a correct ISO date string',
//   '"e" must be a correct ISO date string'
// ]

console.dir(data);
// {
//   a: '2017-06-03T15:34:23.345Z',
//   b: null,
//   c: null,
//   d: null,
//   e: null
// }

process.exit(0);
