'use strict';

/**
 * Validate & normalize a number
 *
 * @param {Object} schema - Validation schema
 * @param {Any} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 *
 * @return {Number|NaN} - Normalized copy of the passed data
 *
 * @public
 */
module.exports = function validateArray (schema, data, errors) {
  const normalized = Number(data);

  if (Number.isNaN(normalized)) {
    errors.push(schema.notNumberErrorMessage);
    return normalized;
  }

  if (schema.maxValue != null && normalized > schema.maxValue) {
    errors.push(schema.maxValueMsg);
  }

  if (schema.minValue != null && normalized < schema.minValue) {
    errors.push(schema.minValueMsg);
  }

  return normalized;
};
