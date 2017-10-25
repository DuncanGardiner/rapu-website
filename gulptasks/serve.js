var bSync = require('browser-sync').create();
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var reload = bSync.reload;
var sass    = require('gulp-sass');

//The main task the default gulp startup tasks calls
gulp.task('serve',
[
    'brower-sync'
],
function(){
    gulp.watch('./app/**/*.scss' ,['styles']);
    gulp.watch('./bin/**/*.js').on('change', reload);
    gulp.watch('./views/**/*.ejs').on('change', reload); 
}
);



//BrowserSync is used to reload the browser pages without the need to restart gulp
gulp.task('brower-sync',
[
     'styles', 'nodemon'
], function() {
    bSync.init(null, {
        proxy: "localhost:3000", // listens to the port app.js is transmitting on
        //browser: 'google-chrome',
        port: 5000,  // outputs the pages on a different port.
        notify: true
    });
}
);

//Compile the Sass files into the Css files and auto inject into the browser
gulp.task('styles', function() {
    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./bin"))
        .pipe(bSync.stream());
  });

gulp.task('nodemon', 
[],
function (done) {
    var running = false;
    return nodemon({
      script: 'server/app.js',
      ignore: [
        'gulpfile.js',
        'node_modules/'
      ],
      watch: ['server/**/*.*']
    })
    .on('start', function(){
        if (!running){
            done();
        }
        running = true;
    })
    .on('start', function () {
      setTimeout(function(){
          reload();
      }, 500); 
  });
}
);