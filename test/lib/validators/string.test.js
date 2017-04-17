'use strict';

const test = require('tape');
const sinon = require('sinon');

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

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate errors collection with the error');
  t.end();
});

test(`${moduleName} > there is a transform rule`, t => {
  const transformStub = sinon.spy();
  const schemaStub = {
    transformFn: transformStub
  };
  const dataStub = 'a_string';
  const errorsStub = [];

  self(schemaStub, dataStub, errorsStub);

  t.equal(transformStub.calledWith(dataStub), true,
    'should call transform function with the value');
  t.end();
});

test(`${moduleName} > validator is defined`, t => {
  const validateStub = sinon.spy();
  const schemaStub = {
    validatorFn: validateStub
  };
  const dataStub = 'a_string';
  const errorsStub = [];

  self(schemaStub, dataStub, errorsStub);

  t.equal(validateStub.calledWith(dataStub), true,
    'should call validate function with the value');
  t.end();
});

test(`${moduleName} > validator returns a falsey value`, t => {
  const ERR_MSG = 'error_message';
  const validateStub = () => '';
  const schemaStub = {
    validatorFn: validateStub,
    validateMsg: ERR_MSG
  };
  const dataStub = 'a_string';
  const errorsStub = [];

  self(schemaStub, dataStub, errorsStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should populate errors collection with the error');
  t.end();
});
