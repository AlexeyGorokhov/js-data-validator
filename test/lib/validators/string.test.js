'use strict';

const test = require('tape');

const moduleName = 'lib/validators/string';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > the string is empty and "isNotEmpty" is set`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    isNotEmpty: true,
    isNotEmptyMsg: ERR_MSG
  };
  const dataStub = '';
  const errorsStub = [];

  self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.end();
});
