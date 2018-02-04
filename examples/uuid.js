'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: '6c0f0bb6-4161-40a5-a79c-1189a8c847ce',
  b: 'any_other_string'
};

const schema = Jdv.object().keys({
  a: Jdv.uuid('"a" must be a correct UUID'),
  b: Jdv.uuid('"b" must be a correct UUID'),
  c: Jdv.uuid('"c" must be a correct UUID').required('"c" is required')
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// [
//   '"b" must be a correct UUID',
//   '"c" is required'
// ]

console.dir(data);
// {
//   a: '6c0f0bb6-4161-40a5-a79c-1189a8c847ce',
//   b: null
// }

const dataToProcess1 = '6c0f0bb6-4161-40a5-a79c-1189a8c847ce';
const dataToProcess2 = 'not_uuid';

const schema1 = Jdv.uuid('expected correct uuid');

const { data: data1, errors: errors1 } = Jdv.validate(schema1, dataToProcess1);
const { data: data2, errors: errors2 } = Jdv.validate(schema1, dataToProcess2);

console.dir(errors1); // []
// [
//   'expected correct uuid'
// ]

console.dir(data1); // 6c0f0bb6-4161-40a5-a79c-1189a8c847ce

console.dir(errors2);
// [
//   'expected correct uuid'
// ]

console.dir(data2); // null

process.exit(0);
