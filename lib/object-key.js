'use strict';

const stampit = require('stampit');

const Requirable = require('./requirable');
const Defaultable = require('./defaultable');

/**
 * Compose methods to be used to validate an object properties
 */
module.exports = stampit().compose(Requirable).compose(Defaultable);
