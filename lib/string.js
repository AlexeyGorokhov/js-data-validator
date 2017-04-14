'use strict';

const stampit = require('stampit');

const ObjectKey = require('./object-key');

module.exports = stampit()
  .methods({
    notEmpty,
    transform,
    validate
  })
  .compose(ObjectKey);

/**
 * Describe validation rule for non-empty string
 *
 * @param {String} [msg] - Optional. Error message. Defaults to the empty string
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

/**
 * Describe custom transformation function
 *
 * @param {Function} fn
 *
 * @return {Object} - Validation schema (this)
 *
 * @public
 */
function transform (fn) {
  const transformFn = typeof fn === 'function' ? fn : val => val;
  this.transform = transformFn;
  return this;
}

/**
 * Describe custom validation function
 *
 * @param {Function} fn The function is passed the value and must return a Boolean value
 * @param {String} [msg] Optional. Error message. Defaults to the empty string
 *
 * @return {Object} - Validation schema (this)
 *
 * @public
 */
function validate (fn, msg = '') {
  const validatorFn = typeof fn === 'function' ? fn : () => true;
  this.validate = validatorFn;
  this.validateMsg = msg;
  return this;
}
