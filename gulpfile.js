var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

function output(processors, extname) {

    return gulp.src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename: "style",
            extname: extname
        }))
        .pipe(gulp.dest('src/'));

}


gulp.task('default', ['dev', 'production'], function() {

});

// Production version minified with comments
gulp.task('production', function () {

    var processors = [
        autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
        cssnano({discardComments: true}),
    ];

    return output(processors, '.css');

});

// Development version, run production version when done.
gulp.task('dev', function () {

    var processors = [
        autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
    ];

    return output(processors, '.dev.css');

});

gulp.task('watch', function () {

	gulp.watch('src/scss/*.scss', ['dev', 'production']);
  gulp.watch('src/scss/**/*.scss', ['dev', 'production']);

});
