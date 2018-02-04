'use strict';

const test = require('tape');

const moduleName = 'lib/validators/uuid.js';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > passed correct value`, t => {
  const schemaStub = {};
  const dataStub = '6c0f0bb6-4161-40a5-a79c-1189a8c847ce';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.length, 0, 'should not populate errors collection');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > passed value is not an UUID`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notUuidErrorMessage: ERR_MSG
  };
  const dataStub = 'foo';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, null, 'should return null');
  t.end();
});
