'use strict';

const { IncomingMessage } = require('http');

const chooseLibrary = require('../httplib');

/**
 * Resolves to the body of an HTTP response as a string
 * @param {string} url - The URL to request from
 * @returns {Promise<string>} - The response data
 */
const get = url =>
	get.stream(url).then((res, data = '') =>
		new Promise((resolve, reject) =>
			res.once('error', reject)
				.on('data', d => data += d)
				.once('end', () => resolve(data))));

/**
 * Resolves to a HTTP(S) response object
 * @param {string} url - The URL to request from
 * @returns {Promise<IncomingMessage>} - The HTTP response object
 */
get.stream = url =>
	new Promise((resolve, reject) =>
		chooseLibrary(url)
			.get(url, resolve)
			.once('error', reject));

/**
 * Resolves to HTTP response headers
 * @param {string} url - The URL to request from
 * @returns {Promise<object>} - The response headers
 */
get.headers = url => get.stream(url).then(res => res.headers);

/**
 * Resolves to the parsed json object of a response
 * @param {string} url - The URL to request from
 * @returns {Promise<any>} - The JSON response
 */
get.json = url => get(url).then(JSON.parse);

module.exports = get;
