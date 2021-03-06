# gulp-pure-cjs 

[Gulp](http://gulpjs.com/) plugin for [pure-cjs](https://github.com/RReverser/pure-cjs)

[![NPM version](https://badge-me.herokuapp.com/api/npm/gulp-pure-cjs.png)](http://badges.enytc.com/for/npm/gulp-pure-cjs) 

## Getting Started

1. Install the module with: `npm install gulp-pure-cjs --save-dev`

2. Add a task to your `Gulpfile.js`:

```javascript
var pure = require('gulp-pure-cjs');

gulp.task('build', function() {
  
    return gulp.src('./lib/index.js')
        .pipe(pure({
            exports: 'my-exported-module'
        }))
        .pipe(gulp.dest('dist'));
});

```

## Beware!

_`pure-cjs` always re-read files from disk, so if you load other plugin in pipeline that
changes file content, this changes will be lost!_

## Sourcemaps

In order to produce sourcemaps, you have to use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) plugin. This allow source modification info to be preserved through your pipeline, from 
where you call `sourcemaps.init` to where you call `sourcemaps.write`. 
See `gulp-sourcemaps` project for more info about out it works.

```javascript
var sourcemaps = require('gulp-sourcemaps');

...

return gulp.src('./test/example_test.js')
        .pipe(sourcemaps.init())
...
        .pipe(pure())
...
        .pipe(sourcemaps.write('.'))
...

```


## Options

The options object you use to call the plugin is passed to pure-cjs transform method
with some change:

* `dryRun` is always set to true, in order to disable pure-cjs output file save
* `input` is overwritten with filename received from gulp pipeline

For documentation on all other options available, see [pure-cjs repo](https://github.com/RReverser/pure-cjs#options-object)

## Other stuff

* documentation - maybe I will add documentation if you ask it. Open an issue for this.
* support - open an issue [here](https://github.com/parroit/gulp-pure-cjs/issues).

## License
[MIT](http://opensource.org/licenses/MIT) © 2014, Andrea Parodi
