'use strict';

/**
 * Map schema object keys to keys of the object under validation
 *
 * @param {Object}
 *        @prop {Array<String>} dataKeys Collection of factual keys of the object under validation
 *        @prop {Array<String>} schemaKeys Collection of object's keys defined by the schema
 *        @prop {Boolean} isCaseInsensitive Optional. Flag describing whether the schema defines
 *              case insensitive key validation. Defaults to false.
 *
 * @return {Object}
 *         @prop {Map<String, String>} schemaKeysToDataKeys Map of object's keys defined by
 *               the schema to the factual keys of the object under validation
 *         @prop {Array<String>} restDataKeys Collection of factual keys not covered by the schema
 *
 * @public
 */
module.exports = function mapSchemaKeysToDataKeys ({
  dataKeys,
  schemaKeys,
  isCaseInsensitive = false
}) {
  const dataKeysMap = new Map();

  for (const key of dataKeys) {
    dataKeysMap.set(
      isCaseInsensitive ? key.toLowerCase() : key,
      key
    );
  }

  const schemaKeysToDataKeys = new Map();

  for (const key of schemaKeys) {
    const searchedKey = isCaseInsensitive ? key.toLowerCase() : key;

    if (dataKeysMap.has(searchedKey)) {
      schemaKeysToDataKeys.set(key, dataKeysMap.get(searchedKey));
      dataKeysMap.delete(searchedKey);
    } else {
      schemaKeysToDataKeys.set(key, null);
    }
  }

  return {
    schemaKeysToDataKeys,
    restDataKeys: Array.from(dataKeysMap.values())
  };
};
