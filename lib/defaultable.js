'use strict';

const stampit = require('stampit');

const Defaultable = stampit()
  .methods({
    defaultsTo
  });

module.exports = Defaultable;

function defaultsTo (val = null) {
  this.isDefaulted = true;
  this.defaultVal = val;
  return this;
}
