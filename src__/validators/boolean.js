'use string';

module.exports = function validateBoolean (schema, data, errors) {
  const v = Boolean(data);

  return v;
};
