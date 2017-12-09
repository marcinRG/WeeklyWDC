'use strict';

var devFolder = './src/';

var lessFolder = devFolder + 'less/';
var jsAppFolder = devFolder + 'js/';
var cssFolder = devFolder + 'css/';

var buildPath = './build/';

var bootstrapFolder = './node_modules/bootstrap/';
var fontAwesomeFolder = './node_modules/font-awesome/';

var bootstrap = {
    fonts: bootstrapFolder + 'fonts/**.*',
    lessStyles: bootstrapFolder + 'less/**/*.less'
};

var fontAwesome = {
    fonts: fontAwesomeFolder + 'fonts/**.*',
    lessStyles: fontAwesomeFolder + 'less/**/*.less'
};

var paths = {
    client: './src/',
    cssFolder: cssFolder,
    fontsFolder: devFolder + 'fonts/',
    cssStyles: [cssFolder + '**/*.css'],
    cssFile: cssFolder + 'style.css',
    index: devFolder + 'index.html',

    allJs: ['./*.js', jsAppFolder + '**/*.js'],
    jsFile: jsAppFolder + '/app.js',
    compiledJs: devFolder + 'bundle.js',
    jsAppFiles: [jsAppFolder + '**/*.js'],
    fontsSrc: devFolder + 'fonts/**/*.*',
    imageSrc: devFolder + 'images/**/*.*',

    bootstrapLess: lessFolder + 'bootstrap',
    fontAwesomeLess: lessFolder + 'font-awesome',
    fontAwesomeFonts: devFolder + 'fonts' + '/font-awesome',
    lessStyles: [lessFolder + '**/*.less', '!' + lessFolder + 'font-awesome/' + '**/*.less'],
    lessFile: lessFolder + 'style.less'
};

var build = {
    path: buildPath,
    cssPath: buildPath + 'css',
    jsPath: buildPath + 'js',
    fontsPath: buildPath + 'fonts',
    imagesPath: buildPath + 'images'
};

module.exports = {
    app: paths,
    build: build,
    bootstrap: bootstrap,
    fontAwesome: fontAwesome
};
