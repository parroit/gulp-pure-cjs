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
        options.map = !!file.sourceMap;

        cjs.transform(options)

            .then(function(result) {

                var outputFile = new gutil.File({
                    path: result.options.output,
                    contents: new Buffer(result.code)
                });
                result.map.file = result.map.file || outputFile.path;
                result.map.mappings = result.map._mappings || [];
                result.map.sources = result.map._sources._array || [];

                applySourceMap(outputFile, result.map);

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
