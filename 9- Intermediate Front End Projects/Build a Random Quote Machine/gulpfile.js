'use strict';

const gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const minifyjs = require('gulp-js-minify');
var browserSync = require('browser-sync').create();

gulp.task('html', function() {
  return gulp.src('./src/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./build/'))
      .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(concat('bundle.js'))
      .pipe(minifyjs())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream());
});

gulp.task('plugins', function () {
  gulp.src(["./src/plugins/**/*.*"], {base: "./src/plugins"})
      .pipe(gulp.dest("./build/plugins"));
})

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  });
});

// ========================= Watches ===================

gulp.watch('./src/*.html', ['html']);
gulp.watch('./src/js/*.js', ['js']);
gulp.watch('./src/sass/**/*.scss', ['sass']);
gulp.watch('./src/plugins/**/*.*', ['plugins']);

// ========================= Default ===================

gulp.task('default', ['html', 'sass', 'js', 'plugins','serve']);