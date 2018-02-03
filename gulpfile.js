'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')

const path = require('path')

const source_dir = path.join('.', 'src');
const dist_dir = path.join('.', 'dist');

gulp.task('javascript', () => {
  return gulp.src(`${source_dir}/*.js`)
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist_dir))
})

gulp.task('default', ['javascript']);

gulp.task('watch', function() {
  gulp.watch(`${source_dir}/*.js`, ['javascript'])
})
