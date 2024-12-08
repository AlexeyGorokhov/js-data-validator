import stampit from 'stampit';

const ObjectKey = require('./object-key');

module.exports = stampit()
  .compose(ObjectKey);
