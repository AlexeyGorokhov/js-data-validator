'use strict';

const stampit = require('stampit');

const Requirable = stampit()
  .methods({
    required
  });

module.exports = Requirable;

function required (msg = '') {
  this.isRequired = true;
  this.isRequiredMsg = String(msg);
  return this;
}
