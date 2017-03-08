'use strict';

const stampit = require('stampit');

const ObjectKey = require('./object-key');

module.exports = stampit()
  .methods({
    notEmpty
  })
  .compose(ObjectKey);

/**
 * Describe validation rule for non-empty array
 *
 * @param {String} [msg] - Optional. Error message. Defaults to the empty string.
 *
 * @return {Object} - Validation schema (this)
 *
 * @public
 */
function notEmpty (msg = '') {
  this.isNotEmpty = true;
  this.isNotEmptyMsg = String(msg);
  return this;
}
