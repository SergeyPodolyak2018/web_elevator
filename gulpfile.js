var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

gulp.task('watch', function () {
    gulp.watch('./control/static/admin/less/*.less', ['less']);
});

gulp.task('less', function () {
    gulp.src('./control/static/admin/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./control/static/admin/css/'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./control/static/admin/css'))

});

gulp.task('default', ['less', 'watch']);