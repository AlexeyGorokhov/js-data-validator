'use strict';

const stampit = require('stampit');

const validate = require('./lib/validate');
const ObjectStamp = require('./lib/object');
const StringStamp = require('./lib/string');

/**
 * Root exported object
 */
module.exports = {
  validate,
  object,
  string
};

function object () {
  return Object.assign(stampit().compose(ObjectStamp).create(), {
    type: 'object'
  });
}

function string () {
  return Object.assign(stampit().compose(StringStamp).create(), {
    type: 'string'
  });
}
