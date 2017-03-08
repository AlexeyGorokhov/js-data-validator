'use strict';

const test = require('tape');
const sinon = require('sinon');

const moduleName = 'lib/validators/array';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > data is not an array`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notArrayErrorMessage: ERR_MSG
  };
  const dataStub = 'not_an_array';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(Array.isArray(result) && result.length === 0, true, 'should return an empty array');
  t.end();
});

test(`${moduleName} > data is an empty array but no "notEmpty" rule`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    isNotEmptyMsg: ERR_MSG
  };
  const dataStub = [];
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), false, 'should not add error');
  t.equal(result.length === dataStub.length, true, 'should return an array of the same size');
  t.notEqual(result, dataStub, 'should not mutate passed data');
  t.end();
});

test(`${moduleName} > data is an empty array and "notEmpty" rule is present`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    isNotEmpty: true,
    isNotEmptyMsg: ERR_MSG
  };
  const dataStub = [];
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result.length === dataStub.length, true, 'should return an array of the same size');
  t.notEqual(result, dataStub, 'should not mutate passed data');
  t.end();
});

test(`${moduleName} > there is no validation rule for array elements`, t => {
  const ELEM_1 = {};
  const ELEM_2 = {};
  const schemaStub = {};
  const dataStub = [ELEM_1, ELEM_2];
  const errorsStub = [];
  const itemValidatorStub = sinon.spy();

  const result = self(schemaStub, dataStub, errorsStub, itemValidatorStub);

  t.equal(itemValidatorStub.called, false, 'should not validate items');
  t.equal(result[0] === dataStub[0] && result[1] === dataStub[1], true,
    'should not mutate elements');
  t.end();
});

test(`${moduleName} > there is a validation rule for array elements`, t => {
  const ELEM_1 = {};
  const ELEM_2 = {};
  const schemaStub = {
    schemaForItems: {}
  };
  const dataStub = [ELEM_1, ELEM_2];
  const errorsStub = [];
  const itemValidatorStub = sinon.spy();

  self(schemaStub, dataStub, errorsStub, itemValidatorStub);

  t.equal(itemValidatorStub.callCount, 2, 'should invoke validator for each element');
  t.end();
});
