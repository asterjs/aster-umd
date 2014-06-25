# aster-umd
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Wrap code to [UMD](https://github.com/umdjs/umd) with aster.

## Usage

First, install `aster-umd` as a development dependency:

```shell
npm install --save-dev aster-umd
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var concat = require('aster-concat');
var umd = require('aster-umd');

aster.src('src/**/*.js')
.map(concat('superLib.js'))
.map(umd({
  deps: [
    {name: 'jquery', globalName: 'jQuery'},
    'jade',
    {name: 'lodash', globalName: '_', amdName: '../lodash'}
  ]
  //, exports: 'superLib' - no need to set explicitly in this case
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### umd(options)

#### options.exports
Type: `String`
Default: generated from filename (i.e. `superLib/smth.js` => `superLib.smth`).

Global name (may be namespaced) for exported object.

#### options.deps
Type: `Array(String | Object)`
Default: `[]`

External dependencies array. Each item may be either string or extended object in following form:
```js
{
  name: '' // default name for any properties that aren't set
  paramName: '', // parameter name for the wrapper function
  globalName: '', // global name for dependency
  amdName: '', // module name for the AMD dependency
  cjsName: '' // module name for the CJS dependency
}
```

For example, from:
```javascript
[
    {name: 'jquery', globalName: 'jQuery', paramName: '$' /* , cjsName: ..., amdName: ... */},
    'jade',
    {name: 'lodash', globalName: '_', amdName: '../lodash'}
]
```
...you would get:
```javascript
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jade', '../lodash'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('jade'), require('lodash'));
    } else {
        root.test = factory(root.jQuery, root.jade, root._);
    }
}(this, function($, jade, _) {
    // ...
}));
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-umd
[npm-image]: https://badge.fury.io/js/aster-umd.png

[travis-url]: http://travis-ci.org/asterjs/aster-umd
[travis-image]: https://secure.travis-ci.org/asterjs/aster-umd.png?branch=master
