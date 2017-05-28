'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: 1,
  b: 'foo',
  c: 'bar',
  B: 'baz'
};

const schema = Jdv.object().keys({
  a: Jdv.integer('"a" must be an integer'),
  b: Jdv.string()
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// []

console.dir(data);
// { a: 1, b: 'foo', c: 'bar', B: 'baz' }
// Note that c and B remain unvalidated

process.exit(0);
