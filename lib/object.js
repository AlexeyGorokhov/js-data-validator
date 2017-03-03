'use strict';

const stampit = require('stampit');

module.exports = stampit()
  .methods({
    keys
  });

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
