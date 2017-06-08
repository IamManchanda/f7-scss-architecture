var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var autoprefixer = require('autoprefixer');

var $ = plugins();

gulp.task('sass', function() {
  return gulp.src(['scss/*'])
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('build', ['sass']);

gulp.task('default', ['build']);
