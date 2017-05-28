'use strict';

const test = require('tape');

const moduleName = 'lib/util/map-schema-keys-to-data-keys';
const self = require(`../../../${moduleName}`);

test(`${moduleName} > schema matches data w/o case insensitivity`, t => {
  const dataKeys = ['keyOne', 'keyTwo'];
  const schemaKeys = [...dataKeys];

  const { schemaKeysToDataKeys, restDataKeys } = self({ dataKeys, schemaKeys });

  t.deepEqual(Array.from(schemaKeysToDataKeys.keys()), [...schemaKeys],
    'the keys map should include all schema keys');
  t.deepEqual(Array.from(schemaKeysToDataKeys.values()), [...dataKeys],
    'schema keys should map to factual dataKeys');
  t.equal(restDataKeys.length, 0, 'should return empty collection of rest keys');
  t.end();
});

test(`${moduleName} > schema matches data with case insensitivity`, t => {
  const dataKeys = ['keyOne', 'keyTwo'];
  const schemaKeys = [...dataKeys];

  const { schemaKeysToDataKeys, restDataKeys } =
    self({ dataKeys, schemaKeys, isCaseInsensitive: true });

  t.deepEqual(Array.from(schemaKeysToDataKeys.keys()), [...schemaKeys],
    'the keys map should include all schema keys');
  t.deepEqual(Array.from(schemaKeysToDataKeys.values()), [...dataKeys],
    'schema keys should map to factual dataKeys');
  t.equal(restDataKeys.length, 0, 'should return empty collection of rest keys');
  t.end();
});

test(`${moduleName} > there are data keys not covered by schema`, t => {
  const schemaKeys = ['keyOne', 'keyTwo'];
  const restKeys = ['keyThree', 'keyFour'];
  const dataKeys = [...schemaKeys, ...restKeys];

  const { restDataKeys } = self({ dataKeys, schemaKeys });

  t.deepEqual(restDataKeys, restKeys,
    'should return correct collection of keys not covered by schema');
  t.end();
});

test(`${moduleName} > the target key is only descoverable with case insensitivity`, t => {
  const restKeys = ['keyThree', 'keyFour'];
  const mappableDataKeys = ['keyOne', 'KeyTWO'];
  const dataKeys = [...mappableDataKeys, ...restKeys];
  const schemaKeys = ['keyOne', 'keyTwo'];

  const { schemaKeysToDataKeys, restDataKeys } =
    self({ dataKeys, schemaKeys, isCaseInsensitive: true });

  t.deepEqual(Array.from(schemaKeysToDataKeys.keys()), [...schemaKeys],
    'the keys map should include all schema keys');
  t.deepEqual(Array.from(schemaKeysToDataKeys.values()), [...mappableDataKeys],
    'schema keys should map to factual dataKeys');
  t.deepEqual(restDataKeys, restKeys,
    'should return correct collection of keys not covered by schema');
  t.end();
});

test(`${moduleName} > there are two similar data keys and case insensitivity is applied`, t => {
  const dataKeys = ['KeyOne', 'keyONE'];
  const schemaKeys = ['keyOne'];

  const { schemaKeysToDataKeys, restDataKeys } =
    self({ dataKeys, schemaKeys, isCaseInsensitive: true });

  t.equal(schemaKeysToDataKeys.get('keyOne'), 'keyONE',
    'schema key should reference the last data key entry');
  t.equal(restDataKeys.length, 0,
    'should not include the first entry to the rest data keys collection');
  t.end();
});

test(`${moduleName} > there are two similar data keys and case insensitivity is not applied`, t => {
  const dataKeys = ['KeyOne', 'keyONE'];
  const schemaKeys = ['keyOne'];

  const { schemaKeysToDataKeys, restDataKeys } =
    self({ dataKeys, schemaKeys, isCaseInsensitive: false });

  t.equal(schemaKeysToDataKeys.get('keyOne'), null,
    'schema key should not reference any data key');
  t.deepEqual(restDataKeys, dataKeys,
    'should include all not matched keys to the rest data keys collection');
  t.end();
});

test(`${moduleName} > schema has a key that data does not have`, t => {
  const dataKeys = [];
  const schemaKeys = ['keyOne'];

  const { schemaKeysToDataKeys } =
    self({ dataKeys, schemaKeys, isCaseInsensitive: false });

  t.equal(schemaKeysToDataKeys.get('keyOne'), null,
    'schema key should not reference any data key');
  t.end();
});
