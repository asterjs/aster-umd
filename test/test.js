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
			program: parse('return [jquery, jade, lodash]', {tolerant: true}),
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
			'        this.superLib = factory(root.jQuery, root.jade, root._);\n' +
			'    }\n' +
			'}(function (jquery, jade, lodash) {\n' +
			'    return [\n' +
			'        jquery,\n' +
			'        jade,\n' +
			'        lodash\n' +
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

