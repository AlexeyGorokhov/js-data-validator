'use strict';

const test = require('tape');
const sinon = require('sinon');

const moduleName = 'lib/validators/object';
const self = require(`../../../${moduleName}`);
const errorsStub = [];

test(`${moduleName} > data object has more props than described in schema`, t => {
  const schemaStub = {
    objectProps: {
      a: 'some_val',
      b: 'some_val'
    }
  };
  const FIXED_VAL = [];
  const dataStub = {
    a: 'some_val',
    b: 'some_val',
    c: FIXED_VAL
  };
  const nextStub = sinon.spy();

  const result = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(nextStub.callCount, 2, 'should not invoke validation for props missing in schema');
  t.equal(result.c, FIXED_VAL, 'should not mutate unvalidated props');
  t.end();
});

test(`${moduleName} > data does not have a prop existing in schema`, t => {
  const schemaStub = {
    objectProps: { a: 'some_val' }
  };
  const dataStub = {};
  const nextStub = sinon.spy();

  self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(nextStub.called, false, 'should not try to validate missing prop');
  t.end();
});

test(`${moduleName} > missing data prop is required`, t => {
  const ERR_MSG = 'err_msg';
  const schemaStub = {
    objectProps: {
      a: {
        isRequired: true,
        isRequiredMsg: ERR_MSG
      }
    }
  };
  const dataStub = {};
  const errorsStub = [];
  let nextStub;

  self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should add error message');
  t.end();
});

test(`${moduleName} > missing data prop is defaulted`, t => {
  const DEFAULT_VAL = 'dafault_val';
  const schemaStub = {
    objectProps: {
      a: {
        isDefaulted: true,
        defaultVal: DEFAULT_VAL
      }
    }
  };
  const dataStub = {};
  let nextStub;

  const result = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(result.a, DEFAULT_VAL, 'should assign default value to the prop');
  t.end();
});

test(`${moduleName} > missing data prop is defaulted and required`, t => {
  const ERR_MSG = 'err_msg';
  const DEFAULT_VAL = 'dafault_val';
  const schemaStub = {
    objectProps: {
      a: {
        isRequired: true,
        isRequiredMsg: ERR_MSG,
        isDefaulted: true,
        defaultVal: DEFAULT_VAL
      }
    }
  };
  const dataStub = {};
  const errorsStub = [];
  let nextStub;

  const result = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should add error message');
  t.equal(result.hasOwnProperty('a'), false, 'should not add the prop with default value');
  t.end();
});
