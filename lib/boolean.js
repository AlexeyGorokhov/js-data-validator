'use strict';

const stampit = require('stampit');

const ObjectKey = require('./object-key');

module.exports = stampit()
  .compose(ObjectKey);
