'use strict';

/**
 * Validate & normalize a record
 *
 * @param {Object} schema - Validation schema
 * @param {Object} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 * @param {Function} itemValidator - Function to be called to validate keys and values of the record
 *
 * @return {Object} - Normalized copy of the passed data
 *
 * @public
 */
module.exports = function validateRecord (schema, data, errors, itemValidator) {
  const isObject = typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null;

  if (!isObject) {
    errors.push(schema.notRecordErrorMessage);
    return {};
  }

  if (Object.keys(data).length === 0 && schema.isNotEmpty) {
    errors.push(schema.isNotEmptyMsg);
    return {};
  }

  const normalizedRecord = {};

  for (const [key, value] of Object.entries(data)) {
    const nKey = schema.schemaForKey
      ? itemValidator(schema.schemaForKey, key, errors)
      : key;

    const nValue = schema.schemaForValue
      ? itemValidator(schema.schemaForValue, value, errors)
      : value;

    normalizedRecord[nKey] = nValue;
  }

  return normalizedRecord;
};
