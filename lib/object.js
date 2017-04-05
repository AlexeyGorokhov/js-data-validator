'use strict';

const stampit = require('stampit');

const ObjectKey = require('./object-key');

module.exports = stampit()
  .methods({
    keys
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
