'use strict';

const test = require('tape');
const proxyquire = require('proxyquire').noPreserveCache().noCallThru();
const sinon = require('sinon');

const moduleName = 'lib/validators/object';

const getSelf = ({
  mapSchemaKeysToDataKeysStub = () => ({
    schemaKeysToDataKeys: new Map(),
    restDataKeys: []
  })
} = {}) => proxyquire(`../../../${moduleName}`, {
  '../util/map-schema-keys-to-data-keys': mapSchemaKeysToDataKeysStub
});

test(`${moduleName} > missing key is required`, t => {
  const ERR_MSG = Symbol('err_msg');
  const schemaStub = {
    objectProps: {
      'propOne': {
        isRequired: true,
        isRequiredMsg: ERR_MSG
      }
    }
  };
  const dataStub = {};
  const errorsStub = [];
  const nextStub = sinon.spy();
  const self = getSelf({
    mapSchemaKeysToDataKeysStub: () => ({
      schemaKeysToDataKeys: new Map([['propOne', null]]),
      restDataKeys: []
    })
  });

  const returnVal = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(errorsStub.includes(ERR_MSG), true, 'should put error into errors collection');
  t.equal(returnVal.hasOwnProperty('propOne'), false,
    'should not include the prop into the normalized data');
  t.equal(nextStub.called, false, 'should not invoke deep validation');
  t.end();
});

test(`${moduleName} > missing key is defaulted`, t => {
  const ERR_MSG = Symbol('err_msg');
  const DEFAULT_VAL = Symbol('default_val');
  const schemaStub = {
    objectProps: {
      'propOne': {
        isRequiredMsg: ERR_MSG,
        isDefaulted: true,
        defaultVal: DEFAULT_VAL
      }
    }
  };
  const dataStub = {};
  const errorsStub = [];
  const nextStub = sinon.spy();
  const self = getSelf({
    mapSchemaKeysToDataKeysStub: () => ({
      schemaKeysToDataKeys: new Map([['propOne', null]]),
      restDataKeys: []
    })
  });

  const returnVal = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(errorsStub.includes(ERR_MSG), false, 'should not put error into errors collection');
  t.equal(returnVal['propOne'], DEFAULT_VAL,
    'should include the prop into the normalized data with default value');
  t.equal(nextStub.called, false, 'should not invoke deep validation');
  t.end();
});

test(`${moduleName} > key is present`, t => {
  const VAL = Symbol('val');
  const ERR_MSG = Symbol('err_msg');
  const schemaStub = {
    objectProps: {
      'propOne': {
        isRequired: true,
        isRequiredMsg: ERR_MSG,
        isDefaulted: true
      }
    }
  };
  const dataStub = { propone: VAL };
  const errorsStub = [];
  const nextStub = sinon.spy(() => VAL);
  const self = getSelf({
    mapSchemaKeysToDataKeysStub: () => ({
      schemaKeysToDataKeys: new Map([['propOne', 'propone']]),
      restDataKeys: []
    })
  });

  const returnVal = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(errorsStub.includes(ERR_MSG), false, 'should not put error into errors collection');
  t.equal(returnVal['propOne'], VAL,
    'should include renamed prop into the normalized data');
  t.equal(nextStub.called, true, 'should invoke deep validation');
  t.end();
});

test(`${moduleName} > data has props not described by schema`, t => {
  const schemaStub = {
    objectProps: {}
  };
  const VAL = Symbol('val');
  const dataStub = { propTwo: VAL };
  const errorsStub = [];
  const nextStub = sinon.spy();
  const self = getSelf({
    mapSchemaKeysToDataKeysStub: () => ({
      schemaKeysToDataKeys: new Map(),
      restDataKeys: ['propTwo']
    })
  });

  const returnVal = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(returnVal['propTwo'], VAL,
    'should include the prop into the normalized data');
  t.equal(nextStub.called, false, 'should not invoke deep validation');
  t.end();
});

test(`${moduleName} > key is nullable`, t => {
  const schemaStub = {
    objectProps: {
      'propOne': {
        isNullable: true
      }
    }
  };
  const dataStub = { propOne: null };
  const errorsStub = [];
  const nextStub = sinon.spy();
  const self = getSelf({
    mapSchemaKeysToDataKeysStub: () => ({
      schemaKeysToDataKeys: new Map([['propOne', 'propOne']]),
      restDataKeys: []
    })
  });

  const returnVal = self(schemaStub, dataStub, errorsStub, nextStub);

  t.equal(errorsStub.length, 0, 'should not put any error into errors collection');
  t.equal(returnVal.propOne, null, 'should keep null value in the key');
  t.equal(nextStub.called, false, 'should not invoke deep validation');
  t.end();
});
