/*
 * gulp-pure-cjs example
 * https://github.com/parroit/gulp-pure-cjs
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

var pure = require('..');

//purify example tests
gulp.task('build', function() {
    return gulp.src('./test/example_test.js')
        .pipe(sourcemaps.init())
        
        .pipe(
            pure({
                output: 'example_test.js',
                exports: 'example_test'
            }).on('error',console.log)
        )
        
        .pipe(sourcemaps.write('.'))
        .pipe(
            gulp.dest('dist')
        );

});

//run purified tests
gulp.task('default',['build'], function() {
    require('./dist/example_test');
});
