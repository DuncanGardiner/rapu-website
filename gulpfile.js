var gulp        = require('gulp');
var sass        = require('gulp-sass');
var bSync = require('browser-sync').create();
// var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

//Compile the Sass files into the Css files and auto inject into the browser
gulp.task('styles', function() {
  return gulp.src('./app/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest("./bin"))
      .pipe(bSync.stream());
});

//BrowserSync is used to reload the browser pages without the need to restart gulp
gulp.task('serve', ['styles', 'nodemon'], function() {
    bSync.init({
        proxy: "localhost:3000", // listens to the port app.js is transmitting on
        port: 5000,  // outputs the pages on a different port.
        notify: true
    });

    gulp.watch('./app/**/_*.scss' ,['styles']);
    gulp.watch('./app/**/*.scss' ,['styles']);
    gulp.watch('./bin/**/*.js').on('change', bSync.reload);
    gulp.watch('./views/**/*.ejs').on('change', bSync.reload);   
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
      script: 'app.js',
      ignore: [
        'gulpfile.js',
        'node_modules/'
      ]
    })
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    })
 
  });


gulp.task('default', ['serve']);