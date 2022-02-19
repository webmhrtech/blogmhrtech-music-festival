const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Images
const cache = require('gulp-cache');

/* npm install --save-dev gulp-imagemin@7.1.0  THIS VERSION WORKS !!! */
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

/* ==================== EXAMPLE FOR TASKS
function myTask(done)
    console.log("The first task...");
    done();
}
exports.myTask = myTask; 

NOTE: WE CAN HAVE MANY TASKS
========================================*/


//*** PROJECT TASKS IN GULPFILE.JS ***// 

function taskCSS(done){
    src('src/scss/**/*.scss') // Identify the .scss file that I am going to use
        .pipe(plumber())
        .pipe( sass() ) // Compile file
        .pipe( dest('build/css') ); // Save file to hard disk

    console.log("Task for compile file .scss to .css ...");
    done();
}

/* npm install --save-dev gulp-imagemin@7.1.0  THIS VERSION WORKS !!! */
function taskImages( done ) {
    const op = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(op) ) )
        .pipe( dest('build/img') )
    done();
}

function taskWebp( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe( dest('build/img') )
    done();
}

function taskAvif( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') 
        .pipe( avif(options) )
        .pipe( dest('./build/img') )
    done();
}

function taskJS(done) {
    src('src/js/**/*.js', taskJS)
        .pipe(dest('./build/js'))

    done();    
}

function taskWatch(done) {

    /* watch ('file that listens', the calling function) */
    watch('src/scss/**/*.scss', taskCSS);
    watch('src/js/**/*.js', taskJS);
    console.log("Task for watch...");
    done();
}

exports.taskCSS = taskCSS; 
exports.taskJS = taskJS;
exports.taskImages = taskImages;
exports.taskWebp = taskWebp;
exports.taskAvif = taskAvif;
exports.taskWatch = taskWatch;
exports.taskWatch = parallel ( taskImages,taskWebp,taskAvif,taskJS,taskWatch );