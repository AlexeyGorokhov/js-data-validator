'use strict';

const test = require('tape');

const moduleName = 'lib/validators/iso-date-string.js';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > passed correct value`, t => {
  const schemaStub = {};
  const dataStub = '2017-06-03T15:34:05.456Z';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.length, 0, 'should not populate errors collection');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > passed value is dramatically non-date`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notISODateStringErrorMessage: ERR_MSG
  };
  const dataStub = 'foo';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, null, 'should return null');
  t.end();
});

test(`${moduleName} > passed value does not end with Z`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notISODateStringErrorMessage: ERR_MSG
  };
  const dataStub = '2017-06-03T15:34:05.456';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, null, 'should return null');
  t.end();
});

test(`${moduleName} > passed value does not have T char`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notISODateStringErrorMessage: ERR_MSG
  };
  const dataStub = '2017-06-03 15:34:05.456Z';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, null, 'should return null');
  t.end();
});

test(`${moduleName} > passed value is incorrect date`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notISODateStringErrorMessage: ERR_MSG
  };
  const dataStub = '2017-16-03T15:34:05.456Z';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, null, 'should return null');
  t.end();
});

test(`${moduleName} > passed value has incorrect time`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notISODateStringErrorMessage: ERR_MSG
  };
  const dataStub = '2017-06-03T15:61:05.456Z';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, null, 'should return null');
  t.end();
});
