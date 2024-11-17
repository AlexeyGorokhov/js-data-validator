'use strict';

const Jdv = require('../index');

const dataToProcess = {
  a: 1,
  b: 'foo',
  c: 'bar',
  B: 'baz',
  d: null
};

const schema = Jdv.object().keys({
  a: Jdv.integer('"a" must be an integer'),
  b: Jdv.string(),
  d: Jdv.number('"d" must be a number').nullable()
});

const { data, errors } = Jdv.validate(schema, dataToProcess);

console.dir(errors);
// []

console.dir(data);
// { a: 1, b: 'foo', d: null, c: 'bar', B: 'baz' }
// Note that c and B remain unvalidated

process.exit(0);
