'use strict';

const validateObject = require('./validators/object');
const validateArray = require('./validators/array');
const validateString = require('./validators/string');
const validateInteger = require('./validators/integer');
const validateNumber = require('./validators/number');
const validateBoolean = require('./validators/boolean');
const validateISODateString = require('./validators/iso-date-string');
const validateUuid = require('./validators/uuid');

/**
 * Validate & normalize a piece of data
 *
 * @param {Object} schema - Validation schema
 * @param {Any} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 *
 * @return {Any} - Normalized copy of the passed data
 *
 * @public
 */
module.exports = function validateSchema (schema, data, errors) {
  switch (schema.type) {
    case 'object':
      return validateObject(schema, data, errors, validateSchema);
    case 'array':
      return validateArray(schema, data, errors, validateSchema);
    case 'string':
      return validateString(schema, data, errors);
    case 'integer':
      return validateInteger(schema, data, errors);
    case 'number':
      return validateNumber(schema, data, errors);
    case 'boolean':
      return validateBoolean(schema, data, errors);
    case 'isoDateString':
      return validateISODateString(schema, data, errors);
    case 'uuid':
      return validateUuid(schema, data, errors);
    default:
      return data;
  }
};
