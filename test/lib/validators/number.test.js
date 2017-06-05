'use strict';

const test = require('tape');

const moduleName = 'lib/validators/number';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > value cannot be parsed into a number`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    notNumberErrorMessage: ERR_MSG
  };
  const dataStub = 'foo';
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(Number.isNaN(result), true, 'should return NaN');
  t.end();
});

test(`${moduleName} > max value is set and passed value does not exceed it`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    maxValue: 5.5,
    maxValueMsg: ERR_MSG
  };
  const dataStub = 5.5;
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), false,
    'should not populate erorrs collection with the error');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > max value is set and passed value exceeds it`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    maxValue: 5.5,
    maxValueMsg: ERR_MSG
  };
  const dataStub = 5.51;
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > max value is set to 0 and passed value exceeds it`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    maxValue: 0,
    maxValueMsg: ERR_MSG
  };
  const dataStub = 0.001;
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > min value is set and passed value is not lower`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    minValue: 5,
    minValueMsg: ERR_MSG
  };
  const dataStub = 5.1;
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), false,
    'should not populate erorrs collection with the error');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > min value is set and passed value is lower`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    minValue: 5,
    minValueMsg: ERR_MSG
  };
  const dataStub = 4.99;
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});

test(`${moduleName} > min value is set to 0 and passed value is lower`, t => {
  const ERR_MSG = 'error_message';
  const schemaStub = {
    minValue: 0,
    minValueMsg: ERR_MSG
  };
  const dataStub = -0.0001;
  const errorsStub = [];

  const result = self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate erorrs collection with the error');
  t.equal(result, dataStub, 'should return passed value');
  t.end();
});
