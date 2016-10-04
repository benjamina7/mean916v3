var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pump = require('pump');

gulp.task('concatJs', function() {
    console.log('gulp task: concatJs!');
    return gulp.src(['public/js/*.js',
                     'public/js/controllers/*.js',
                     'public/js/services/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('minJs', ['concatJs'], function() {
    console.log('gulp task: jsmin!');
    return gulp.src('dist/scripts/app.js')
    .pipe(uglify('app.min.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('default', ['concatJs'], function() {
    console.log('gulp in command!');
});
