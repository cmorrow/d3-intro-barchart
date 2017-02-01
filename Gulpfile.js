'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

// webserver
gulp.task('webserver', function() {
  gulp.src('src')
    .pipe(webserver({
      host: '127.0.0.1', //10.0.0.209',//
      fallback: 'index.html', // homepage file in root of app folder
      livereload: true,
      directoryListing: false,
      open: true
    }));
});





gulp.task('default', ['sass', 'webserver', 'sass:watch']);