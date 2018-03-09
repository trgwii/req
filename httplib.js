'use strict';

const { URL } = require('url');
const http = require('http');
const https = require('https');

/**
 * Finds correct library to use for a given URL string
 * @param {string} url - The URL to parse
 * @returns {module:http} - The correct library
 */
const chooseLibrary = url =>
	new URL(url).protocol === 'https:'
		? https
		: http;

module.exports = chooseLibrary;
