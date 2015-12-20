var gulp = require('gulp');
var seq = require('gulp-sequence');
var flatten = require('gulp-flatten');
var del = require('del');
var uglify = require('gulp-uglify');


gulp.task('default', function () {
});

gulp.task('build', seq('clean', 'copy'));

gulp.task('release', seq('clean', 'copy', 'uglify'));
var configuration = {
    context: __dirname + '/',
    output: {
        build: __dirname + "/build"
    }
};

var paths = {
    all: ['app/**/*.*'],
    test: ['test/**/*.spec.js']
};

// Delete the build directory
gulp.task('clean', function () {
    return del([configuration.output.build, 'build.zip']);
});

// Copy all other files to dist directly
gulp.task('copy', function () {
    return gulp.src(paths.all, {cwd: configuration.context})
        .pipe(flatten())
        .pipe(gulp.dest(configuration.output.build));
});

gulp.task('uglify', function () {
    return gulp.src(configuration.output.build + '/**/*.js', {cwd: configuration.context})
        .pipe(uglify())
        .pipe(gulp.dest(configuration.output.build));
});