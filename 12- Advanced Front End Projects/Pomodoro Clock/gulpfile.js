'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const minifyjs = require('gulp-js-minify');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

let environment = 'development';
// let environment = 'production';

let location = './build/';

if(environment === 'production'){
  location = './dist/'
}

gulp.task('clean', function() {
  return gulp.src(location+ '**/*.*')
      .pipe(clean());
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
      .pipe(gulpif( environment === 'production', htmlmin({collapseWhitespace: true})))
      .pipe(gulp.dest(location))
      .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(gulpif( environment === 'production', minifyjs()))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(location+ 'js'))
      .pipe(browserSync.stream());
});

gulp.task('plugins', function () {
  gulp.src(["./src/plugins/**/*.*"], {base: "./src/plugins"})
      .pipe(gulp.dest(location+ "plugins"));
});

gulp.task('assets', function () {
  gulp.src(["./src/assets/**/*.*"], {base: "./src/assets"})
      .pipe(gulp.dest(location+ "assets"));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpif( environment === 'production', sass({outputStyle: 'compressed'}).on('error', sass.logError)))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(location+ 'css'))
      .pipe(browserSync.stream());
});

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.css')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpif( environment === 'production', sass({outputStyle: 'compressed'}).on('error', sass.logError)))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(location+ 'css'))
      .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: location
    }
  });
});

gulp.task('images', function () {
  gulp.src('src/images/**/*.*', {base: "./src/images"})
      .pipe(imagemin())
      .pipe(gulp.dest(location + 'images'))
});

// ========================= Watches ===================

gulp.watch('./src/*.html', ['html']);
gulp.watch('./src/js/*.js', ['js']);
gulp.watch('./src/css/**/*.css', ['css']);
gulp.watch('./src/sass/**/*.scss', ['sass']);
gulp.watch('./src/plugins/**/*.*', ['plugins']);
gulp.watch('./src/images/**/*.*', ['images']);

// ========================= Default ===================

gulp.task('default', ['clean', 'html', 'sass', 'js', 'plugins', 'assets', 'serve', 'images', 'css']);