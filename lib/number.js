'use strict';

const stampit = require('stampit');

const ObjectKey = require('./object-key');

module.exports = stampit()
  .methods({
    min,
    max
  })
  .compose(ObjectKey);

/**
 * Describe validation rule for minimum value
 *
 * @param {Number} value Minimal value
 * @param {String} [msg] Optional. Error message. Defaults to empty string
 *
 * @return {Object} Validation schema (this)
 *
 * @public
 */
function min (value, msg = '') {
  if (value !== Number(value)) {
    throw new TypeError('value must be a number');
  }

  this.minValue = value;
  this.minValueMsg = String(msg);
  return this;
}

/**
 * Describe validation rule for maximum value
 *
 * @param {Integer} value Maximum value
 * @param {String} [msg] Optional. Error message. Defaults to the empty string
 *
 * @return {Object} Validation schema (this)
 *
 * @public
 */
function max (value, msg = '') {
  if (value !== Number(value)) {
    throw new TypeError('value must be a number');
  }

  this.maxValue = value;
  this.maxValueMsg = String(msg);
  return this;
}
