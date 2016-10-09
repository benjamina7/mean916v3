var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pump = require('pump');

gulp.task('dev', function() {
    console.log('gulp task: dev!');
    return gulp.src(['public/js/*.js',
                     'public/js/controllers/*.js',
                     'public/js/services/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

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

// var gulp = require('gulp');
// var connect = require('gulp-connect');
// var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');
// var minifyCSS = require('gulp-minify-css');
// var clean = require('gulp-clean');
// var runSequence = require('run-sequence');

// gulp.task('lint', function() {
//     gulp.src(['public/js/*.js',
//               'public/js/controllers/*.js',
//               'public/js/services/*.js'])
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(jshint.reporter('fail'));
// });
// gulp.task('clean', function() {
//     gulp.src('./dist/*')
//       .pipe(clean({force: true}));
// });
// gulp.task('minify-css', function() {
//   var opts = {comments:true,spare:true};
//   gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
//     .pipe(minifyCSS(opts))
//     .pipe(gulp.dest('./dist/'))
// });
// gulp.task('minify-js', function() {
//   gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
//     .pipe(uglify({
//       // inSourceMap:
//       // outSourceMap: "app.js.map"
//     }))
//     .pipe(gulp.dest('./dist/'))
// });
// gulp.task('copy-bower-components', function () {
//   gulp.src('./app/bower_components/**')
//     .pipe(gulp.dest('dist/bower_components'));
// });
// gulp.task('copy-html-files', function () {
//   gulp.src('./app/**/*.html')
//     .pipe(gulp.dest('dist/'));
// });
// gulp.task('connect', function () {
//   connect.server({
//     root: 'app/',
//     port: 8888
//   });
// });
// gulp.task('connectDist', function () {
//   connect.server({
//     root: 'dist/',
//     port: 8080
//   });
// });

// // default task
// gulp.task('default',
//   ['lint', 'connect']
// );
// gulp.task('build', function() {
//   runSequence(
//     ['clean'],
//     ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
//   );
// });