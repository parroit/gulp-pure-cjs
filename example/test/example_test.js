/*
 * gulp-pure-cjs example
 * https://github.com/parroit/gulp-pure-cjs
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var example = require('../lib/example.js');

function is (l, r){
    if (l !== r) {
        throw new Error('gosh');
    }
}

is(typeof example,'function');
is(example(), 'Pure Cjs is awesome');
console.log('All tests done');