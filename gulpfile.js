'use strict';
var gulp    = require('gulp'),
    wrench  = require('wrench');

wrench
  .readdirSyncRecursive('./gulptasks')
  .filter(function(file){
    return (/\.(js)$/i).test(file);
  })
  .map(function(file){
    require('./gulptasks/' + file);
  });
  
gulp.task('default', ['serve']);