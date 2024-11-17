'use strict';

const mapSchemaKeysToDataKeys = require('../util/map-schema-keys-to-data-keys');

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
  const dataKeys = Object.keys(_data);
  const schemaKeys = Object.keys(schema.objectProps);
  const isCaseInsensitive = schema.isKeysCaseInsensitive;

  const { schemaKeysToDataKeys, restDataKeys } =
    mapSchemaKeysToDataKeys({ dataKeys, schemaKeys, isCaseInsensitive });

  for (const [ schemaKey, dataKey ] of schemaKeysToDataKeys.entries()) {
    if (!_data.hasOwnProperty(dataKey)) {
      if (schema.objectProps[schemaKey].isRequired) {
        errors.push(schema.objectProps[schemaKey].isRequiredMsg);
        continue;
      }

      if (schema.objectProps[schemaKey].isDefaulted) {
        returnVal[schemaKey] = schema.objectProps[schemaKey].defaultVal;
      }

      continue;
    }

    if (_data[dataKey] === null && schema.objectProps[schemaKey].isNullable) {
      returnVal[schemaKey] = null;
      continue;
    }

    returnVal[schemaKey] = next(schema.objectProps[schemaKey], _data[dataKey], errors);
  }

  for (const key of restDataKeys) {
    returnVal[key] = _data[key];
  }

  return returnVal;
};
