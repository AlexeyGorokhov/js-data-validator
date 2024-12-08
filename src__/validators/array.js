'use strict';

/**
 * Validate & normalize an array
 *
 * @param {Object} schema - Validation schema
 * @param {Array} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 * @param {Function} itemValidator - Function to be called to validate each element of the array
 *
 * @return {Array} - Normalized copy of the passed data
 *
 * @public
 */
module.exports = function validateArray (schema, data, errors, itemValidator) {
  if (!Array.isArray(data)) {
    errors.push(schema.notArrayErrorMessage);
    return [];
  }

  if (data.length === 0 && schema.isNotEmpty) {
    errors.push(schema.isNotEmptyMsg);
    return [];
  }

  return data.map(elem => schema.schemaForItems
    ? itemValidator(schema.schemaForItems, elem, errors)
    : elem
  );
};
