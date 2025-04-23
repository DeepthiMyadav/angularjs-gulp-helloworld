const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

// Some pointless comments for our project.

var devMode = false;

// 'css' task - compiles and outputs CSS
gulp.task('css', function() {
    return gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 'js' task - compiles and outputs JS
gulp.task('js', function() {
    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 'html' task - copies HTML files
gulp.task('html', function() {
    return gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 'build' task - sequence of css, js, html tasks
gulp.task('build', gulp.series('css', 'js', 'html'));

// 'browser-sync' task - sets up live reloading
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

// 'start' task - dev mode and watches for changes
gulp.task('start', gulp.series('build', 'browser-sync', function() {
    devMode = true;
    gulp.watch(['./src/css/**/*.css'], gulp.series('css'));
    gulp.watch(['./src/js/**/*.js'], gulp.series('js'));
    gulp.watch(['./src/templates/**/*.html'], gulp.series('html'));
}));

