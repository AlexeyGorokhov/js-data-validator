'use strict';

const test = require('tape');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');

const moduleName = 'lib/validate-schema';

const getSelf = ({
  validateAnyStub = () => {},
  validateObjectStub = () => {},
  validateArrayStub = () => {},
  validateStringStub = () => {},
  validateIntegerStub = () => {},
  validateNumberStub = () => {},
  validateBooleanStub = () => {},
  validateISODateStringStub = () => {},
  validateUuidStub = () => {}
}) => proxyquire(`../../${moduleName}`, {
  './validators/any': validateAnyStub,
  './validators/object': validateObjectStub,
  './validators/array': validateArrayStub,
  './validators/string': validateStringStub,
  './validators/integer': validateIntegerStub,
  './validators/number': validateNumberStub,
  './validators/boolean': validateBooleanStub,
  './validators/iso-date-string': validateISODateStringStub,
  './validators/uuid': validateUuidStub
});

test(`${moduleName} > called with "any" schema`, t => {
  const validateAnyStub = sinon.spy();
  const schemaStub = { type: 'any' };
  const self = getSelf({ validateAnyStub });

  self(schemaStub);

  t.equal(validateAnyStub.called, true, 'should invoke "ant" validator');
  t.end();
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

test(`${moduleName} > called with "number" schema`, t => {
  const validateNumberStub = sinon.spy();
  const schemaStub = { type: 'number' };
  const self = getSelf({ validateNumberStub });

  self(schemaStub);

  t.equal(validateNumberStub.called, true, 'should invoke "number" validator');
  t.end();
});

test(`${moduleName} > called with "boolean" schema`, t => {
  const validateBooleanStub = sinon.spy();
  const schemaStub = { type: 'boolean' };
  const self = getSelf({ validateBooleanStub });

  self(schemaStub);

  t.equal(validateBooleanStub.called, true, 'should invoke "boolean" validator');
  t.end();
});

test(`${moduleName} > called with "isoDateString" schema`, t => {
  const validateISODateStringStub = sinon.spy();
  const schemaStub = { type: 'isoDateString' };
  const self = getSelf({ validateISODateStringStub });

  self(schemaStub);

  t.equal(validateISODateStringStub.called, true, 'should invoke "isoDateString" validator');
  t.end();
});

test(`${moduleName} > called with "uuid" schema`, t => {
  const validateUuidStub = sinon.spy();
  const schemaStub = { type: 'uuid' };
  const self = getSelf({ validateUuidStub });

  self(schemaStub);

  t.equal(validateUuidStub.called, true, 'should invoke "uuid" validator');
  t.end();
});
