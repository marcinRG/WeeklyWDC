'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')({lazy: true});
var sassLint = require('gulp-sass-lint');
var del = require('del');

var settings = require('./gulp.settings/settings');

//code check
gulp.task('code-check', function () {
    return gulp.src(settings.app.allJs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('clean-styles', function (done) {
    var files = settings.app.cssFolder + '*.css';
    clean(files, done);
});

gulp.task('lint-sass', ['clean-styles'], function () {
    return gulp.src(settings.app.scssStyles)
        .pipe(sassLint(
            {
                configFile: '.sass-lint.yml'
            }
        ))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('sass-compile', ['lint-sass'], function () {
    msg('Kompilacja plików scss -> css');
    return gulp.src(settings.app.scssFile)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest(settings.app.cssFolder));
});

gulp.task('browserify-compil', ['code-check'], function () {
    return browserify({
        entries: [settings.app.jsFile],
        debug: true
    }).bundle()
        .pipe(source(settings.app.compiledJs))
        .pipe(gulp.dest('./'));
});

gulp.task('browserify-inject-js', ['browserify-compil'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.compiledJs, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

//--functions
function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

gulp.task('sass-watcher', function () {
    gulp.watch(settings.app.scssStyles, ['sass-compile', 'inject-css']);
});

gulp.task('js-watcher', function () {
    gulp.watch(settings.app.jsAppFiles, ['browserify-inject-js']);
});

gulp.task('inject-css', function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.cssFile, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
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

gulp.task('build-prepare', ['browserify-inject-js', 'inject-css'], function () {
});

gulp.task('run-dev', ['browserify-inject-js', 'inject-css'], function () {
    serve(true);
});

gulp.task('run-dist', ['dist-optimize'], function () {
    serve(false);
});

gulp.task('dist-optimize', ['build-prepare', 'copyToBuild-images',
    'copyToBuild-fonts'], function () {
    msg('Poczatek');
    var cleanCss = require('gulp-clean-css');
    return gulp.src(settings.app.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', cleanCss()))
        .pipe(gulp.dest(settings.build.path));
});

function serve(isDev) {
    var nodeOptions = {
        script: settings.server.serverApp,
        ext: 'js',
        delay: 2500,
        env: {
            'PORT': settings.server.port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: settings.server.serverFiles
    };
    return $.nodemon(nodeOptions)
        .on('start', function () {
            msg('...start servera ...');
        })
        .on('restart', function () {
            msg('...restart servera...');
        })
        .on('exit', function () {
        })
        .on('crash', function () {
            msg('!!!Wystąpiły bęłdy');
        });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}
