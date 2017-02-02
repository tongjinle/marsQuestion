let gulp = require('gulp');
let gulp_clean = require('gulp-clean');
let gulp_ts = require('gulp-typescript');
let gulp_babel = require('gulp-babel');


// require('shelljs/global');
let watch_files = [
        "app/**/*.ts",
        "logic/**/*.ts"
    ];



gulp.task('clean', function() {
    return gulp.src(['release/**/*.js', 'dist/**/*.js'], {
            read: false
        })
        .pipe(gulp_clean());
});

gulp.task('tsc', (cb) => {

    let tsProject = gulp_ts.createProject('tsconfig.json');
    var tsResult = gulp.src(watch_files) // or tsProject.src() 
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('release'));
});

gulp.task('babel', cb => {
    let opts = {
        presets: ['es2015', 'es2016', 'es2017'],
        plugins: [
            ["transform-runtime", {
                "polyfill": false,
                "regenerator": true
            }]
        ]
    };
    return gulp.src('release/**/*.js')
        .pipe(gulp_babel(opts))
        .pipe(gulp.dest('dist/'));
});



// gulp.task('run_server',(cb)=>{
//     let exec = require('child_process').exec;
//     exec('node app');
//     cb();
// });

gulp.task('build', gulp.series('clean', 'tsc','babel'), (cb) => {
    console.log('build done');
    cb();
});

gulp.task('watch',cb=>{
    gulp.watch(watch_files,gulp.series('build'));
    cb();
} );


gulp.task('default', gulp.series('build','watch'), () => {
    console.log('default done');

});



// gulp.task('clean',(cb)=>{
//     rm('-rf' ,'dist');
//     cb();
// });