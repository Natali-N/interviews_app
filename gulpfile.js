'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const remember = require('gulp-remember');
const cssNano = require('gulp-cssnano');
const newer = require('gulp-newer');
const eslint = require('gulp-eslint');
const jsMin = require('gulp-jsmin');
const del = require('del');
const htmlMin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
    return gulp.src('src/styles/main.*')
        .pipe(isDevelopment ? sourceMaps.init() : gutil.noop())
        .pipe(less())
        .pipe(autoPrefixer())
        .pipe(remember('styles'))
        .pipe(isDevelopment ? sourceMaps.write() : gutil.noop())
        .pipe(!isDevelopment ? cssNano() : gutil.noop())
        .pipe(gulp.dest(isDevelopment ? 'dist/dev/styles' : 'dist/prod/styles'));
});

gulp.task('html', function() {
    return gulp.src('src/pages/*.html', { since: gulp.lastRun('html') })
        .pipe(newer(isDevelopment ? 'dist/dev' : 'dist/prod'))
        .pipe(!isDevelopment ? htmlMin() : gutil.noop())
        .pipe(gulp.dest(isDevelopment ? 'dist/dev' : 'dist/prod'));
});

gulp.task('resources', function() {
    return gulp.src('src/resources/**', { since: gulp.lastRun('resources') })
        .pipe(newer(isDevelopment ? 'dist/dev/resources' : 'dist/prod/resources'))
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
        .on('error', err => {
            gutil.log('Browserify Error', gutil.colors.red(err.message))
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(!isDevelopment ? jsMin() : gutil.noop())
        .pipe(isDevelopment ? sourceMaps.init() : gutil.noop())
        .pipe(isDevelopment ? sourceMaps.write() : gutil.noop())
        .pipe(gulp.dest(isDevelopment ? 'dist/dev/scripts' : 'dist/prod/scripts'));
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
    gulp.parallel('styles', 'resources', 'scripts'),
    'html'
));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('prod', gulp.series('enable:production', 'build'));
