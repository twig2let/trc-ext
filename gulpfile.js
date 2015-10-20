var gulp = require('gulp');
var seq = require('gulp-sequence');
var flatten = require('gulp-flatten');
var del = require('del');



gulp.task('default', function () {
});

gulp.task('build', seq('clean', 'copy'));

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
    return del(configuration.output.path);
});

// Copy all other files to dist directly
gulp.task('copy', function () {
    return gulp.src(paths.all, {cwd: configuration.context})
        .pipe(flatten())
        .pipe(gulp.dest(configuration.output.path));
});