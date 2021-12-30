const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

/* ==================== EXAMPLE FOR TASKS
function myTask(done){
    console.log("The first task...");
    done();
}
exports.myTask = myTask; 

NOTE: WE CAN HAVE MANY TASKS
========================================*/


//*** PROJECT TASKS IN GULPFILE.JS ***// 

function css(done){
    src('src/scss/app.scss') // Identify the .scss file that I am going to use
        .pipe( sass() ) // Compile file
        .pipe( dest('build/css') ); // Save file to hard disk

    console.log("Task for compile file .scss to .css ...");
    done();
}
exports.css = css; 