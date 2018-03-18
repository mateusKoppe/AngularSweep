var gulp = require('gulp'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create();

gulp.task('develop', ['watchs'] ,function () {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
});

gulp.task('server',function () {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
});

/* Watchs  */
gulp.task('watchs', ['sass-watch', 'javascript-watch']);

gulp.task('sass-watch', ['sass'], function(){
    return gulp.watch("app/**/*.scss", ['sass']);
});

gulp.task('javascript-watch', ['javascript'], function(){
    console.log('javascript-watch');
    return gulp.watch(['app/**/*.js'], ['javascript']);
});

/**  Basic functions **/
gulp.task('javascript', function () {
    gulp.src(['./app/**/*.js', '!**/dist/**.js'])
        .pipe(sourcemaps.init())
        .pipe(order([
            '**/*.module.js',
            '**/*.js'
        ]))
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    gulp.src('src/app/core/style/app.style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('app.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['javascript', 'sass']);
