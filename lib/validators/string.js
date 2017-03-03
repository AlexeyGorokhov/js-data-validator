'use string';

module.exports = function validateString (schema, data, errors) {
  const d = String(data);

  if (d === '' && schema.isNotEmpty) {
    errors.push(schema.isNotEmptyMsg);
  }

  return d;
};
