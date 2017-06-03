'use strict';

const stampit = require('stampit');

const validate = require('./lib/validate');
const ObjectStamp = require('./lib/object');
const ArrayStamp = require('./lib/array');
const StringStamp = require('./lib/string');
const IntegerStamp = require('./lib/integer');
const BooleanStamp = require('./lib/boolean');
const ISODateStringStamp = require('./lib/iso-date-string');

/**
 * Root exported object
 */
module.exports = {
  validate,
  object,
  array,
  string,
  integer,
  boolean,
  ISODateString
};

function object () {
  return Object.assign(stampit().compose(ObjectStamp).create(), {
    type: 'object'
  });
}

function array ({ schema = null, msg = '' } = {}) {
  return Object.assign(stampit().compose(ArrayStamp).create(), {
    type: 'array',
    schemaForItems: schema,
    notArrayErrorMessage: msg
  });
}

function string () {
  return Object.assign(stampit().compose(StringStamp).create(), {
    type: 'string'
  });
}

function integer (msg = '') {
  return Object.assign(stampit().compose(IntegerStamp).create(), {
    type: 'integer',
    notIntegerErrorMessage: msg
  });
}

function boolean () {
  return Object.assign(stampit().compose(BooleanStamp).create(), {
    type: 'boolean'
  });
}

function ISODateString (msg = '') {
  return Object.assign(stampit().compose(ISODateStringStamp).create(), {
    type: 'isoDateString',
    notISODateStringErrorMessage: msg
  });
}
