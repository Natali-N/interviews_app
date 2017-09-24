//@todo: rewrite readme
//@todo remove devDependencies from package json
//@todo check windows
//sprites
//оптимизация html
//remove modules
//separate gulp functions
//content of html pages
//browsersync
//"normalize.css": "7.0.0",

'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const less = require('gulp-less');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const remember = require('gulp-remember');
const cssNano = require('gulp-cssnano');
const fileInclude = require('gulp-file-include');
const useRef = require('gulp-useref');
const imageMin = require('gulp-imagemin');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const jsMin = require('gulp-jsmin');
const del = require('del');
const path = require('path');
const htmlMin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {   //since
    return gulp.src('src/styles/main.*')
        .pipe(gulpIf(isDevelopment, sourceMaps.init()))
        .pipe(gulpIf('*.less', less()))
        .pipe(autoPrefixer())
        .pipe(remember('styles'))
        .pipe(gulpIf(isDevelopment, sourceMaps.write()))
        .pipe(gulpIf(!isDevelopment, cssNano()))
        .pipe(gulp.dest(isDevelopment ? 'dist/dev/styles' : 'dist/build/styles'));
});

gulp.task('html', function() {
    return gulp.src('src/pages/*.html', { since: gulp.lastRun('html') })
        .pipe(newer(isDevelopment ? 'dist/dev' : 'dist/prod'))
        .pipe(gulpIf(!isDevelopment, htmlMin()))
        .pipe(gulp.dest(isDevelopment ? 'dist/dev' : 'dist/prod'));
});

gulp.task('resources', function() {
    return gulp.src('src/resources/**', { since: gulp.lastRun('resources') })
        .pipe(newer(isDevelopment ? 'dist/dev/resources' : 'dist/prod/resources'))
        .pipe(debug({ title: 'resources' }))
        .pipe(gulp.dest(isDevelopment ? 'dist/dev/resources' : 'dist/prod/resources'));
});

gulp.task('scripts', function() {
    return browserify(
        'src/scripts/app.js',
        'src/scripts/dataService.js',
        'src/scripts/router.js',
        'src/scripts/configService.js',
        'src/scripts/questions-page/questionsController.js',
        'src/scripts/questions-page/questionsView.js',
        'src/scripts/questions-page/questionsTemplate.js',
        'src/scripts/report-page/reportController.js',
        'src/scripts/report-page/reportView.js',
        'src/scripts/report-page/reportTemplate.js'
        )
        .transform('babelify', { presets: ['env'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/dev/scripts'));
});

gulp.task('enable:production', function(callback) {
    process.env.NODE_ENV = 'production';
    isDevelopment = false;
    callback();
});

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('watch', function() {
    gulp.watch('src/pages/*.*', gulp.series('html'));

    gulp.watch('src/styles/*.*', gulp.series('styles'));

    gulp.watch('src/resources/*.*', gulp.series('resources'));

    gulp.watch('src/scripts/*.*', gulp.series('scripts'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: 'dist/dev'
    });

    browserSync.watch('dist/dev/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('html', 'styles', 'resources', 'scripts'),
    'html'
));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
