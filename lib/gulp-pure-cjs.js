/*
 * gulp-pure-cjs
 * https://github.com/parroit/gulp-pure-cjs
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');
var applySourceMap = require('vinyl-sourcemaps-apply');
var cjs = require('pure-cjs');

module.exports = function(options) {

    function transform(file, enc, next) {
        

        


        // jshint validthis:true
        var self = this;

        if (file.isNull()) {
            this.push(file); // pass along
            return next();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-less', 'Streaming not supported'));
            return next();
        }


        options.dryRun = true;
        options.input = file.path;
        //options.output = file.path +'.out';
        options.map = !!file.sourceMap;

        cjs.transform(options)

            .then(function(result) {

                var outputFile = new gutil.File({
                    //base: path.dirname(result.options.output),
                    path: result.options.output,
                    contents: new Buffer(result.code)
                });

                applySourceMap(outputFile, JSON.stringify(result.map));

                self.push(outputFile);

            })

            .then(next)

            .catch(function(err) {
                self.emit('error', new PluginError('gulp-pure-cjs', err));
                next();
            });
    }


    return through2.obj(transform);
};
