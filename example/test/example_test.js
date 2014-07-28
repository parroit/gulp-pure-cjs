/*
 * gulp-pure-cjs example
 * https://github.com/parroit/gulp-pure-cjs
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('basic-assert');

var example = require('../lib/example.js');

assert.is(typeof example,'function');
assert.is(example(), 'Pure Cjs is awesome');
console.log('All tests done');