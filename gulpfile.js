let gulp = require('gulp');

let gulp_ts = require('gulp-typescript');

require('shelljs/global');


gulp.task('default',['clean','tsc'],()=>{
    console.log('default done');

});


gulp.task('clean',(cb)=>{
    rm('-rf' ,'dist');
    cb();
});


gulp.task('tsc',(cb)=>{

   let tsProject = gulp_ts.createProject('tsconfig.json');

   let files = [
        "app.ts",
        "*Route.ts",
        "logic/**/*.ts",
        "server/**/*.ts",
        "test/**/*.ts"
    ];
    var tsResult = gulp.src(files) // or tsProject.src() 
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('release'));
});
