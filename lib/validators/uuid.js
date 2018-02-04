'use strict';

/**
 * Validate an UUID string
 *
 * @param {Object} schema - Validation schema
 * @param {Any} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 *
 * @return {String|null} - Normalized copy of the passed data
 */
module.exports = function validateUuid (schema, data, errors) {
  const uuidStr = String(data);
  const anyRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!anyRegex.test(uuidStr)) {
    errors.push(schema.notUuidErrorMessage);
    return null;
  }

  return uuidStr;
};
