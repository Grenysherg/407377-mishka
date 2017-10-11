'use strict';


var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var del = require('del');

var htmlmin = require('gulp-htmlmin');

var sass = require('gulp-sass');
var csso = require('gulp-csso');

var imagemin = require('gulp-imagemin');

var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');

var browserSync = require('browser-sync').create();


gulp.task('html:change', function () {
  return gulp.src('*.html')
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:change'], function () {
  browserSync.reload();
  done();
});

gulp.task('style', function () {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('image', function () {
  return gulp.src('build/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svg-sprite', function () {
  return gulp.src('build/img/svg-sprite/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('svg-sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clean', function () {
  return del('build');
})

gulp.task('copy', function () {
  return gulp.src([
      'fonts/**/*{woff,woff2}',
      'img/**',
      'js/**'
    ], {
      base: '.'
    })
    .pipe(gulp.dest('build'));
})

gulp.task('build', function (fn) {
  runSequence('clean', 'copy', 'html:change', 'style', 'image', 'svg-sprite', fn);
})

gulp.task('serve', function () {
  browserSync.init({
    server: 'build/'
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('*.html', ['html:update']);
});
