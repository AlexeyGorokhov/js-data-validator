'use string';

module.exports = function validateString (schema, data, errors) {
  let d = String(data);

  if (d === '' && schema.isNotEmpty) {
    errors.push(schema.isNotEmptyMsg);
  }

  if (schema.transform) {
    d = schema.transform(d);
  }

  if (schema.validate && !schema.validate(d)) {
    errors.push(schema.validateMsg);
  }

  return d;
};
