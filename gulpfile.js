const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
let files = [conf.path.tasks('*.js')];
// let files = ['gulp_tasks/misc.js'];
const hub = new HubRegistry(files);
console.log(hub);
console.log(files);
// Tell gulp to use the tasks just loaded
// gulp.registry(hub);

// gulp.task('browsersync',reloadBrowserSync);
gulp.task('watch',watch);
gulp.task('build', gulp.series(gulp.parallel('other', 'webpack:dist')));
// gulp.task('test', gulp.series('karma:single-run'));
// gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync'));
// gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean','build'));
// gulp.task('default', gulp.series('webpack:dist'));



// gulp.task('default', gulp.series('clean'),function(cb){
//     console.log('default task');
//     cb();
// });

// gulp.task('default',gulp.series('webpack:watch'),function(cb){
//     console.log(123);
//     cb();
// });


function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  done();
}
