'use strict';

const test = require('tape');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');

const moduleName = 'lib/validate-schema';

const getSelf = ({
  validateObjectStub = () => {},
  validateArrayStub = () => {},
  validateStringStub = () => {},
  validateIntegerStub = () => {}
}) => proxyquire(`../../${moduleName}`, {
  './validators/object': validateObjectStub,
  './validators/array': validateArrayStub,
  './validators/string': validateStringStub,
  './validators/integer': validateIntegerStub
});

test(`${moduleName} > called with "object" schema`, t => {
  const validateObjectStub = sinon.spy();
  const schemaStub = { type: 'object' };
  const self = getSelf({ validateObjectStub });

  self(schemaStub);

  t.equal(validateObjectStub.called, true, 'should invoke "object" validator');
  t.end();
});

test(`${moduleName} > called with "array" schema`, t => {
  const validateArrayStub = sinon.spy();
  const schemaStub = { type: 'array' };
  const self = getSelf({ validateArrayStub });

  self(schemaStub);

  t.equal(validateArrayStub.called, true, 'should invoke "array" validator');
  t.end();
});

test(`${moduleName} > called with "string" schema`, t => {
  const validateStringStub = sinon.spy();
  const schemaStub = { type: 'string' };
  const self = getSelf({ validateStringStub });

  self(schemaStub);

  t.equal(validateStringStub.called, true, 'should invoke "string" validator');
  t.end();
});

test(`${moduleName} > called with "integer" schema`, t => {
  const validateIntegerStub = sinon.spy();
  const schemaStub = { type: 'integer' };
  const self = getSelf({ validateIntegerStub });

  self(schemaStub);

  t.equal(validateIntegerStub.called, true, 'should invoke "integer" validator');
  t.end();
});
