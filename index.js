'use strict';

const stampit = require('stampit');

const validate = require('./lib/validate');
const ObjectStamp = require('./lib/object');
const ArrayStamp = require('./lib/array');
const StringStamp = require('./lib/string');
const IntegerStamp = require('./lib/integer');
const NumberStamp = require('./lib/number');
const BooleanStamp = require('./lib/boolean');
const ISODateStringStamp = require('./lib/iso-date-string');
const UuidStamp = require('./lib/uuid');

/**
 * Root exported object
 */
module.exports = {
  validate,
  object,
  array,
  string,
  integer,
  number,
  boolean,
  ISODateString,
  uuid
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

function number (msg = '') {
  return Object.assign(stampit().compose(NumberStamp).create(), {
    type: 'number',
    notNumberErrorMessage: msg
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

function uuid (msg = '') {
  return Object.assign(stampit().compose(UuidStamp).create(), {
    type: 'uuid',
    notUuidErrorMessage: msg
  });
}
