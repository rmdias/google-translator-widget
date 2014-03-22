var gulp = require('gulp');
var gutil = require('gulp-util');

// package.json
var pkg = require('./package.json');

//plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var minifyHtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');


// tasks
gulp.task('build', function(){
 
  // { concat, minify & jshint }
  var scriptFiles = './assets/js/**/*.js';
  var scriptDist = './js';
  
  gulp.src(scriptFiles)
      .pipe(concat('all.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest(scriptDist));


  // { sass }
  var sassFiles = './assets/sass/all.sass';
  var sassDist = './css';

  gulp.src(sassFiles)
      .pipe(concat('all.min.sass'))
      .pipe(sass({unixNewlines: true, style: 'compressed'}))
      .pipe(gulp.dest('./css'));


  // { image optimizer }
  var imageFiles = './assets/img/**/*';
  var imageDist = './img';
  gulp.src(imageFiles)
      .pipe(imagemin())
      .pipe(gulp.dest(imageDist));


  // { html }
  var htmlFiles = './assets/html/**/*.html';
  var htmlDist = './';

  gulp.src(htmlFiles)
      .pipe(minifyHtml())
      .pipe(gulp.dest(htmlDist));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  // gulp.run('build');

  // Watch files and run tasks if they change
  gulp.watch('./assets/**/*', function() {
    var date = new Date(), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(),
        buildTime = hour + ':' + minutes + ':' + seconds;

    gulp.run('build', function() {
      gutil.log(gutil.colors.blue('------------- Built! -------------'), gutil.colors.green('( Last time -', buildTime, ')'));
    });

  });
});
