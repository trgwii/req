'use strict';

const Url = require('url');
const http = require('http');
const https = require('https');

/**
 * Finds correct library to use for a given URL string
 * @param {string} url - The URL to parse
 * @returns {object} - The correct library
 */
const chooseProto = url =>
	Url.parse(url).protocol === 'https:'
		? https
		: http;

/**
 * Resolves to a HTTP(S) response object
 * @param {string} url - The URL to request from
 * @returns {Promise<object>} - The HTTP response object
 */
const req = url =>
	new Promise((resolve, reject) =>
		chooseProto(url)
			.get(url, resolve)
				.once('error', reject));

/**
 * Resolves to the body of an HTTP response as a string
 * @param {string} url - The URL to request from
 * @returns {Promise<string>} - The response data
 */
const get = url =>
	req(url).then((res, data = '') =>
		new Promise((resolve, reject) =>
			res.once('error', reject)
				.on('data', d => data += d)
				.once('end', () => resolve(data))));

/**
 * Resolves to a HTTP(S) response object
 * @param {string} url - The URL to request from
 * @returns {Promise<object>} - The HTTP response object
 */
get.stream = req;

/**
 * Resolves to HTTP response headers
 * @param {string} url - The URL to request from
 * @returns {Promise<object>} - The response headers
 */
get.headers = url => req(url).then(res => res.headers);

/**
 * Resolves to the parsed json object of a response
 * @param {string} url - The URL to request from
 * @returns {Promise<any>} - The JSON response
 */
get.json = url => get(url).then(JSON.parse);

module.exports = get;
