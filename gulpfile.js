var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var autoprefixer = require('autoprefixer');
var browser = require('browser-sync');

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

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*', ['sass', browser.reload]);
});



gulp.task('test', ['sass', 'watch'], function() {
  browser.init({
    server: {
      baseDir: 'test/visual',
      directory: true,
      routes: {
        "/css": "dist/css"
      }
    }
  });
  gulp.watch(['test/visual/**/*'], ['test:reload']);
});

gulp.task('test:reload', function(done) {
  browser.reload();
  done();
});

gulp.task('build', ['sass']);

gulp.task('default', ['test']);
