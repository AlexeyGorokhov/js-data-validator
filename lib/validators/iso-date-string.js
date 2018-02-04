'use strict';

/**
 * Validate an ISO date string
 *
 * @param {Object} schema - Validation schema
 * @param {Any} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 *
 * @return {String|null} - Normalized copy of the passed data
 */
module.exports = function validateISODateString (schema, data, errors) {
  const dateStr = String(data);
  const timestamp = Date.parse(dateStr);

  if (Number.isNaN(timestamp)) {
    errors.push(schema.notISODateStringErrorMessage);
    return null;
  }

  const newDateString = new Date(timestamp).toISOString();

  if (newDateString !== dateStr) {
    errors.push(schema.notISODateStringErrorMessage);
    return null;
  }

  return dateStr;
};
