var gulp = require('gulp');
var clean = require('gulp-clean');
var flatten = require('gulp-flatten');


gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('build', ['clean', 'copy']);

var configuration = {
    context: __dirname + '/',
    output: {
        path: __dirname + "/build"
    }
};

var paths = {
    all: ['app/**/*.*'],
    test: ['test/**/*.spec.js']
};

// Delete the build directory
gulp.task('clean', function () {
    return gulp.src(configuration.output.path)
        .pipe(clean());
});

// Copy all other files to dist directly
gulp.task('copy', function () {
    return gulp.src(paths.all, {cwd: configuration.context})
        .pipe(flatten())
        .pipe(gulp.dest(configuration.output.path));
});