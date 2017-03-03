'use strict';

/**
 * Validate & normalize an object
 *
 * @param {Object} schema - Validation schema
 * @param {Object} data - Data to validate
 * @param {Array<String>} errors - Ref to the shared collection of validation errors
 * @param {Function} next - Function to be called to validate each object's property
 *
 * @return {Object} - Normalized copy of the passed data
 *
 * @public
 */
module.exports = function validateObject (schema, data, errors, next) {
  const returnVal = {};
  const _data = Object.assign({}, data);
  const allKeys = [...new Set(Object.keys(_data).concat(Object.keys(schema.objectProps)))];

  for (let key of allKeys) {
    if (!_data.hasOwnProperty(key)) {
      if (schema.objectProps[key].isRequired) {
        errors.push(schema.objectProps[key].isRequiredMsg);
        continue;
      }

      if (schema.objectProps[key].isDefaulted) {
        returnVal[key] = schema.objectProps[key].defaultVal;
      }

      continue;
    }

    returnVal[key] = schema.objectProps[key]
      ? next(schema.objectProps[key], _data[key], errors)
      : _data[key];
  }

  return returnVal;
};
