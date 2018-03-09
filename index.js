'use strict';

const get = require('./get');
const post = require('./post');

get.post = post;

module.exports = get;
