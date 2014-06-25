module.exports = function anonymous(data) {
	with(data) {
		function factory(args) {
			return {
				type: 'CallExpression',
				callee: {
					type: 'Identifier',
					name: 'factory'
				},
				arguments: args
			};
		}
		var __ASTER_DATA_0 = amdDeps
		var __ASTER_DATA_1 = factory(cjsDeps)
		var __ASTER_DATA_2 = exports
		var __ASTER_DATA_3 = factory(globalDeps)
		var __ASTER_DATA_4 = {
			type: 'FunctionExpression',
			params: depNames,
			body: {
				type: 'BlockStatement',
				body: file.program.body
			}
		}
	}
	return {
		"type": "Program",
		"body": [{
			"type": "ExpressionStatement",
			"expression": {
				"type": "CallExpression",
				"callee": {
					"type": "FunctionExpression",
					"id": null,
					"params": [{
						"type": "Identifier",
						"name": "factory"
					}],
					"defaults": [],
					"body": {
						"type": "BlockStatement",
						"body": [{
							"type": "IfStatement",
							"test": {
								"type": "LogicalExpression",
								"operator": "&&",
								"left": {
									"type": "BinaryExpression",
									"operator": "===",
									"left": {
										"type": "UnaryExpression",
										"operator": "typeof",
										"argument": {
											"type": "Identifier",
											"name": "define"
										},
										"prefix": true
									},
									"right": {
										"type": "Literal",
										"value": "function",
										"raw": "'function'"
									}
								},
								"right": {
									"type": "MemberExpression",
									"computed": false,
									"object": {
										"type": "Identifier",
										"name": "define"
									},
									"property": {
										"type": "Identifier",
										"name": "amd"
									}
								}
							},
							"consequent": {
								"type": "BlockStatement",
								"body": [{
									"type": "ExpressionStatement",
									"expression": {
										"type": "CallExpression",
										"callee": {
											"type": "Identifier",
											"name": "define"
										},
										"arguments": [
											__ASTER_DATA_0, {
												"type": "Identifier",
												"name": "factory"
											}
										]
									}
								}]
							},
							"alternate": {
								"type": "IfStatement",
								"test": {
									"type": "BinaryExpression",
									"operator": "===",
									"left": {
										"type": "UnaryExpression",
										"operator": "typeof",
										"argument": {
											"type": "Identifier",
											"name": "exports"
										},
										"prefix": true
									},
									"right": {
										"type": "Literal",
										"value": "object",
										"raw": "'object'"
									}
								},
								"consequent": {
									"type": "BlockStatement",
									"body": [{
										"type": "ExpressionStatement",
										"expression": {
											"type": "AssignmentExpression",
											"operator": "=",
											"left": {
												"type": "MemberExpression",
												"computed": false,
												"object": {
													"type": "Identifier",
													"name": "module"
												},
												"property": {
													"type": "Identifier",
													"name": "exports"
												}
											},
											"right": __ASTER_DATA_1
										}
									}]
								},
								"alternate": {
									"type": "BlockStatement",
									"body": [{
										"type": "ExpressionStatement",
										"expression": {
											"type": "AssignmentExpression",
											"operator": "=",
											"left": __ASTER_DATA_2,
											"right": __ASTER_DATA_3
										}
									}]
								}
							}
						}]
					},
					"rest": null,
					"generator": false,
					"expression": false
				},
				"arguments": [
					__ASTER_DATA_4
				]
			}
		}]
	}
};