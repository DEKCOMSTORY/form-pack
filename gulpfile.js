'use strict'

const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const eslint = require('gulp-eslint');

const path = require('path');

const source_dir = path.join('.', 'src');
const dist_dir = path.join('.', 'dist');

gulp.task('lint', () => {
    return gulp.src(`${source_dir}/*.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('javascript', () => {
  return gulp.src(`${source_dir}/*.js`)
    .pipe(babel({
      presets: ['env'],
      plugins: [
        'check-es2015-constants',
        'transform-es2015-block-scoping',
      ]
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist_dir))
})

gulp.task('default', ['lint', 'javascript']);

gulp.task('watch', function() {
  gulp.watch(`${source_dir}/*.js`, ['lint', 'javascript'])
})
