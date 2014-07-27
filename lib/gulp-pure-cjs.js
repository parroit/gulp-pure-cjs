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
var cjs = require('pure-cjs');

module.exports = function(options) {


    function transform(file, enc, next) {
        if (!options) {
            var fileName = path.basename(file.path);
            var baseName = fileName.substr(0,fileName.lastIndexOf('.'));
            var dirName = path.dirname(file.path);
            options = {
                output: baseName + '.min.js'
            };
        }

        if (typeof options === 'string') {
            options = {
                output: options
            };
        }


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



        cjs.transform({
            dryRun: true,
            input: file.path
        })

            .then(function(result) {
                var outputFile = new gutil.File({
                    base: process.cwd(),
                    cwd: process.cwd(),
                    path: path.join(process.cwd(), options.output),
                    contents: new Buffer(result.code)
                });

                self.push(outputFile);
                next();
            })

            .then(null, function(err) {
                console.dir(err);
                // convert the keys so PluginError can read them
                err.lineNumber = err.line;
                err.fileName = err.filename;

                // add a better error message
                err.message = err.message + ' in file ' + err.fileName + ' line no. ' + err.lineNumber;

                self.emit('error', new PluginError('gulp-pure-cjs', err));
                next();
            });
    }


    return through2.obj(transform);
};
