const path = require('path');

const
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');

const toWatch = ['quill-editor.es6.js', 'quill-editor.html'];
const component = 'quill-editor.es6.js';


/**
* Watch changes in .es6.js file and runs 'babel' task
*/
gulp.task('watch', ['connect', 'watch-reload']);

gulp.task('watch-reload', function() {
  gulp.watch(toWatch, ['babel', 'reload']);
});

gulp.task('reload', function () {
  gulp.src(toWatch)
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './../',
    livereload: true
  });
});

gulp.task('babel', () => {
    return gulp.src(component)
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(rename((path) => {
        path.basename = path.basename.replace(/.es6$/, '')
      }))
      .pipe(gulp.dest(''));
});

gulp.task('default', ['babel'])
