'use strict';

const test = require('tape');

const moduleName = 'lib/validators/any.js';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > passed any value`, t => {
  const dataStub = Symbol('');

  const result = self(dataStub);

  t.equal(result, dataStub, 'should return passed value');
  t.end();
});
