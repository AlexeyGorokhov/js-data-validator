'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: 'any_value'
};

const schema = Jdv.object().keys({
  a: Jdv.any(),
  b: Jdv.any().required('"b" is required')
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// [
//   '"b" is required'
// ]

console.dir(data);
// {
//   a: 'any_value'
// }

process.exit(0);
