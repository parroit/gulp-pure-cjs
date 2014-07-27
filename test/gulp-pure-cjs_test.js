/*
 * gulp-pure-cjs
 * https://github.com/parroit/gulp-pure-cjs
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var gulpPureCjs = require('../lib/gulp-pure-cjs.js');

describe('gulpPureCjs', function(){
    it('is defined', function(){
      gulpPureCjs.should.be.a('function');
    });

});
