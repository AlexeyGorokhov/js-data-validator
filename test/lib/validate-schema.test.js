'use strict';

const test = require('tape');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');

const moduleName = 'lib/validate-schema';

const getSelf = ({
  validateObjectStub = () => {},
  validateStringStub = () => {}
}) => proxyquire(`../../${moduleName}`, {
  './validators/object': validateObjectStub,
  './validators/string': validateStringStub
});

test(`${moduleName} > called with "object" schema`, t => {
  const validateObjectStub = sinon.spy();
  const schemaStub = { type: 'object' };
  const self = getSelf({ validateObjectStub });

  self(schemaStub);

  t.equal(validateObjectStub.called, true, 'should invoke "object" validator');
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
