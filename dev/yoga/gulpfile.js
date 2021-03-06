'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

var settings = require('./gulp.settings/settings.gulp.js');

//ususwanie plikow z folderu arkuszow styli css
gulp.task('clean-styles', function (done) {
    var files = settings.app.cssFolder + '*.css';
    clean(files, done);
});

//lintowanie less
gulp.task('lint-less', ['clean-styles'], function () {
    return gulp.src(settings.app.lessStyles).pipe($.lesshint({
            configPath: 'lesshintrc.json'
        }
    )).pipe($.lesshint.reporter())
        .pipe($.lesshint.failOnError());
});

//kompilacja css z less
gulp.task('less-compile', ['lint-less'], function () {
    msg('Kompilacja plików less -> css');
    return gulp.src(settings.app.lessFile)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 3 version', '> 3%']}))
        .pipe(gulp.dest(settings.app.cssFolder));
});

//lintowanie css
gulp.task('lint-css', ['less-compile'], function () {
    return gulp.src(settings.app.cssStyles).pipe($.stylelint({
        failAfterError: true,
        reporters: [
            {formatter: 'verbose', console: true}
        ],
        debug: true
    }));
});

//injectowanie pliku css do index.html
gulp.task('inject-css', ['less-compile'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.cssFile, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('less-watcher', function () {
    gulp.watch(settings.app.lessStyles, ['less-compile', 'inject-css']);
});

gulp.task('browserify-inject-js', ['browserify-compil'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.compiledJs, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('browserify-compil', ['code-check'], function () {
    return browserify({
        entries: [settings.app.jsFile],
        debug: true
    }).transform('babelify')
        .bundle()
        .pipe(source(settings.app.compiledJs))
        .pipe(gulp.dest('./'));
});

gulp.task('js-watcher', function () {
    gulp.watch(settings.app.jsAppFiles, ['browserify-inject-js']);
});

//code check
gulp.task('code-check', function () {
    return gulp.src(settings.app.allJs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('copy-fontawesome-fonts', function () {
    msg('Kopiowanie fontów font-awesome');
    return gulp.src(settings.fontAwesome.fonts)
        .pipe(gulp.dest(settings.app.fontAwesomeFonts));
});

gulp.task('copy-font-awesome-less', function () {
    msg('Kopiowanie less bootstrap');
    return gulp.src(settings.fontAwesome.lessStyles)
        .pipe(gulp.dest(settings.app.fontAwesomeLess));
});

//build tasks
gulp.task('build-dist', ['dist-optimize', 'copyToBuild-fonts', 'copyToBuild-images']);

gulp.task('dist-optimize', ['build-prepare'], function () {
    msg('Poczatek');
    var cleanCss = require('gulp-clean-css');
    return gulp.src(settings.app.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', cleanCss()))
        .pipe(gulp.dest(settings.build.path));
});

gulp.task('build-prepare', ['browserify-compil', 'inject-css'], function () {
});

gulp.task('copyToBuild-fonts', function () {
    msg('Kopiowanie fontów');
    return gulp.src(settings.app.fontsSrc)
        .pipe(gulp.dest(settings.build.fontsPath));
});

gulp.task('copyToBuild-images', function () {
    msg('Kopiowanie obrazów');
    return gulp.src(settings.app.imageSrc)
        .pipe($.imagemin())
        .pipe(gulp.dest(settings.build.imagesPath));
});

//--functions
function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}
