var fs = require('fs');

var tmpl = fs.readFileSync('template.jst', 'utf-8');

var func = require('estemplate').compile(tmpl);

var code = 'module.exports = ' + func + ';';
code = require('js-beautify').js_beautify(code, {indent_with_tabs: true, preserve_newlines: false});

fs.writeFileSync('template.js', code);

console.log('Template was compiled successfully!');
