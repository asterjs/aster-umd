/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	umd = require('..'),
	parse = require('esprima').parse,
	generate = require('escodegen').generate;

it('test', function (done) {
	var input = [{
			type: 'File',
			program: parse('return [jQuery, jade, _]', {tolerant: true}),
			loc: {
				source: 'superLib.js'
			}
		}],
		expected = [
			'(function (factory) {\n' +
			'    if (typeof define === \'function\' && define.amd) {\n' +
			'        define([\n' +
			'            \'jquery\',\n' +
			'            \'jade\',\n' +
			'            \'../lodash\'\n' +
			'        ], factory);\n' +
			'    } else if (typeof exports === \'object\') {\n' +
			'        module.exports = factory(require(\'jquery\'), require(\'jade\'), require(\'lodash\'));\n' +
			'    } else {\n' +
			'        superLib = factory(jQuery, jade, _);\n' +
			'    }\n' +
			'}(function (jQuery, jade, _) {\n' +
			'    return [\n' +
			'        jQuery,\n' +
			'        jade,\n' +
			'        _\n' +
			'    ];\n' +
			'}));'
		];

	// simulating file sequence and applying transformation
	umd({
		deps: [
			{name: 'jquery', globalName: 'jQuery'},
			'jade',
			{name: 'lodash', globalName: '_', amdName: '../lodash'}
		]
	})(Rx.Observable.fromArray(input))
	.pluck('program')
	.map(generate)
	// checking against array of expected results iteratively
	.zip(expected, assert.equal)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

