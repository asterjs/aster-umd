'use strict';

var tmpl = require('estemplate').compile(require('fs').readFileSync(__dirname + '/template.jst', 'utf-8'));
var parse = require('esprima').parse;

function normalizeDeps(deps) {
	return (deps || []).map(function (dep) {
		if (typeof dep === 'string') {
			dep = {name: dep};
		}

		return {
			name: dep.name,
			globalName: dep.globalName || dep.name,
			paramName: dep.paramName || dep.globalName || dep.name,
			amdName: dep.amdName || dep.name,
			cjsName: dep.cjsName || dep.name
		};
	});
}

function literal(value) {
    return {type: 'Literal', value: value};
}

function id(name) {
    return {type: 'Identifier', name: name};
}

module.exports = function (options) {
	options = options || {};

	var deps = normalizeDeps(options.deps);

	var amdDeps = deps.map(function (dep) { return literal(dep.amdName) });

	var globalDeps = deps.map(function (dep) { return id(dep.globalName); });

	var cjsDeps = deps.map(function (dep) {
		return {type: 'CallExpression', callee: id('require'), arguments: [literal(dep.cjsName)]};
	});

	var depNames = deps.map(function (dep) { return id(dep.paramName) });

	var exports = options.exports && parse(options.exports).body[0].expression;

	return function (files) {
		return files.do(function (file) {
			if (options.fromGlobal) {
				file.program.body.push({
					type: 'ReturnStatement',
					argument: exports
				});
			}
			file.program = tmpl({
				amdDeps: amdDeps,
				cjsDeps: cjsDeps,
				globalDeps: globalDeps,
				depNames: depNames,
				exports: exports || parse(file.loc.source.replace(/\//g, '.').replace(/\.js$/, '')).body[0].expression,
				file: file
			});
		});
	}
};
