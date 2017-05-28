'use strict';

const stampit = require('stampit');

const ObjectKey = require('./object-key');

module.exports = stampit()
  .methods({
    keys,
    keysCaseInsensitive
  })
  .compose(ObjectKey);

/**
 * Set validation schemas for object properties
 *
 * @param {Object} obj
 *
 * @return {Object} - Validation schema (this)
 *
 * @public
 */
function keys (obj) {
  this.objectProps = Object.create(null);

  for (let key of Object.keys(obj)) {
    this.objectProps[key] = obj[key];
  }

  return this;
}

/**
 * Set validation rule for object keys to be treated case insensitively and the returning
 * normalized object to have the key names set to the names described in the schema.
 *
 * This rule only spans to the first-level keys.
 *
 * @return {Object} - Validation schema (this)
 *
 * @public
 */
function keysCaseInsensitive () {
  this.isKeysCaseInsensitive = true;

  return this;
}
