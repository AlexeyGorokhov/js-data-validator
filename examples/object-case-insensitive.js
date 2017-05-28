'use strict';

const Jdv = require('../index');

const dataToProcess = {
  aa: 'foo',
  aA: 'bar',
  AA: 'baz'
};

const schema = Jdv.object().keys({
  aA: Jdv.string()
}).keysCaseInsensitive();

const { data} = Jdv.validate(schema, dataToProcess);

console.dir(data);
// { aA: 'baz' }
// Note that the normalized key name is as it is described by the schema, and its value is set
// to the value of the last case insensitively equal keys.

process.exit(0);
