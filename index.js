'use strict';

const stampit = require('stampit');

const validate = require('./lib/validate');
const ObjectStamp = require('./lib/object');
const ArrayStamp = require('./lib/array');
const StringStamp = require('./lib/string');
const IntegerStamp = require('./lib/integer');

/**
 * Root exported object
 */
module.exports = {
  validate,
  object,
  array,
  string,
  integer
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
