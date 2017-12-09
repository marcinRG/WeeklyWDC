'use strict';
var settings = require('./gulp.settings/settings');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('copy', function () {
    var folder = args.path + '/';
    console.log('copy from:');
    console.log(settings.paths.devFolder + folder + settings.paths.defaultBuildFolder);
    console.log('copy to:');
    console.log(settings.paths.doneFolder + folder);
    return gulp.src(settings.paths.devFolder + folder + settings.paths.defaultBuildFolder + '**/*.*')
        .pipe(gulp.dest(settings.paths.doneFolder + folder));
});
