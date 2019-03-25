'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    fileinclude = require('gulp-file-include');
    // imagemin = require('gulp-imagemin'),
    // pngquant = require('imagemin-pngquant');
    
var bc = './bower_components/';

gulp.task('js', function() {
  gulp.src(['builds/development/site/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/dist/site/js/'))
});

gulp.task('fileinclude', function() {
  gulp.src(['builds/development/site/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('builds/dist/site/'));
});

// gulp.task('html', function() {
//   gulp.src('builds/development/site/*.html')
//     .pipe(gulp.dest('builds/dist/site/'))
// });

gulp.task('sass', function () {
  gulp.src('builds/development/site/sass/*')
      .pipe(sass())
      .pipe(concat('style.min.css'))
      // .pipe(csso())
      .pipe(gulp.dest('builds/dist/site/css/'));
});

gulp.task('img', function() {
  gulp.src('builds/development/site/img/*')
    .pipe(gulp.dest('builds/dist/site/img/'));
});

// gulp.task('img', function() {
//   gulp.src('builds/development/site/img/*')
//     .pipe(imagemin({
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],
//       use: [pngquant()]
//     }))
//     .pipe(gulp.dest('builds/dist/site/img/'));
// });

gulp.task('watch', function() {
  gulp.watch('builds/development/site/js/*.js', ['js']);
  gulp.watch('builds/development/site/sass/*.scss', ['sass']);
  gulp.watch('builds/development/site/*.html', ['fileinclude']);
  gulp.watch('builds/development/site/inc/*.html', ['fileinclude']);
  gulp.watch('builds/development/site/img/*', ['img']);
});

gulp.task('libs', function() {
  gulp.src(bc+'jquery/dist/jquery.js')
      .pipe(gulp.dest('./builds/dist/site/js/'));

  gulp.src(bc+'bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('./builds/dist/site/css/'));

  gulp.src(bc+'bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('./builds/dist/site/js/'));
});

gulp.task('webserver', function() {
  gulp.src('builds/dist/site')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('default', [
  'libs',
  'fileinclude',
  'img',
  'js',
  'sass',
  'webserver',
  'watch'
]);
