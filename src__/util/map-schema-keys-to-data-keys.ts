type Params = {
  /** Collection of factual keys of the object under validation */
  dataKeys: string[];
  /** Collection of object's keys defined by the schema */
  schemaKeys: string[];
  /**
   * Flag describing whether the schema defines case insensitive key validation.
   * Defaults to false.
   */
  isCaseInsensitive?: boolean;
};

type ReturnValue = {
  /**
   * Map of object's keys defined by the schema to the factual keys of the object
   * under validation
   */
  schemaKeysToDataKeys: Map<string, string | null>;
  /** Collection of factual keys not covered by the schema */
  restDataKeys: string[];
};

/**
 * Map schema object keys to keys of the object under validation
 */
export default function mapSchemaKeysToDataKeys(params: Params): ReturnValue {
  const {
    dataKeys,
    schemaKeys,
    isCaseInsensitive = false,
  } = params;

  const dataKeysMap = new Map<string, string>();

  for (const key of dataKeys) {
    dataKeysMap.set(
      isCaseInsensitive ? key.toLowerCase() : key,
      key
    );
  }

  const schemaKeysToDataKeys = new Map<string, string | null>();

  for (const key of schemaKeys) {
    const searchedKey = isCaseInsensitive ? key.toLowerCase() : key;

    const dataKey = dataKeysMap.get(searchedKey);

    if (dataKey) {
      schemaKeysToDataKeys.set(key, dataKey);
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
