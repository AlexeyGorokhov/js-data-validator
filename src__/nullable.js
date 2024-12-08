'use strict';

const stampit = require('stampit');

const Nullable = stampit()
  .methods({
    nullable
  });

module.exports = Nullable;

function nullable () {
  this.isNullable = true;
  return this;
}
