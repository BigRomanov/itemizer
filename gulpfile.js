var gulp    = require('gulp');
var inject  = require('gulp-inject');
var nodemon = require('gulp-nodemon');
 
gulp.task('inject-scripts', function () {
  var target = gulp.src('./client/views/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./js/**/*.js', './css/**/*.css'], {read: false, cwd: __dirname + '/client'});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./client/views'));
});

// gulp.task('server', function (cb) {
//   exec('node server.js', function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   });
//   exec('mongod --dbpath ./data', function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   });
// })

gulp.task('build', ['inject-scripts']);

gulp.task('start', ['build'], function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['build', 'start']);