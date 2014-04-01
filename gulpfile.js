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
  var pluginScriptFiles = ['./assets/js/APP.js', './assets/js/APP.widget.js', './assets/js/APP.widget.getSelection.js', './assets/js/APP.widget.request.js'];
  var pluginDist = './js';
  
  gulp.src(pluginScriptFiles)
      .pipe(concat('google-translator-widget.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest(pluginDist));


  // { concat, minify & jshint }
  var configurationScriptFiles = ['./assets/js/APP.js', './assets/js/APP.widget.configuration.js'];
  var configurationScriptDist = './js';
  
  gulp.src(configurationScriptFiles)
      .pipe(concat('google-translator-widget.configuration.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest(configurationScriptDist));

  // { sass }
  var pluginFiles = './assets/sass/google-translator-widget.all.sass';
  var pluginDist = './css';

  gulp.src(pluginFiles)
      .pipe(concat('google-translator-widget.min.sass'))
      .pipe(sass({unixNewlines: true, style: 'compressed'}))
      .pipe(gulp.dest(pluginDist));

  // { sass }
  var pluginFiles = './assets/sass/google-translator-widget.configuration.all.sass';
  var pluginDist = './css';

  gulp.src(pluginFiles)
      .pipe(concat('google-translator-widget.configuration.min.sass'))
      .pipe(sass({unixNewlines: true, style: 'compressed'}))
      .pipe(gulp.dest(pluginDist));


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
