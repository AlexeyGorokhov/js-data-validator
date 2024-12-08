'use string';

module.exports = function validateString (schema, data, errors) {
  let d = String(data);

  if (d === '' && schema.isNotEmpty) {
    errors.push(schema.isNotEmptyMsg);
  }

  if (schema.transformFn) {
    d = schema.transformFn(d);
  }

  if (schema.validatorFn && !schema.validatorFn(d)) {
    errors.push(schema.validateMsg);
  }

  return d;
};
