'use strict';

const chooseLibrary = require('../httplib');

const post = (url, data) =>
	chooseLibrary(url).request();

module.exports = post;
