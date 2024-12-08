'use strict';

const validateSchema = require('./validate-schema');

/**
 * Root validator
 *
 * @param {Object} schema - Validation schema
 * @param {Any} data - Data to validate
 *
 * @return {Object}
 *         @prop {Any} data - Normalized copy of the passed data
 *         @prop {Array<String>} errors - Collection of validation errors
 *
 * @public
 */
module.exports = function validate (schema, data) {
  const errors = [];

  return {
    data: validateSchema(schema, data, errors),
    errors
  };
};
