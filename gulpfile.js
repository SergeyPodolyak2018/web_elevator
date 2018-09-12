var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
const fs   = require('fs');

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



gulp.task('create', () => {
	if(!fs.existsSync('build')){ 
		fs.mkdirSync('build')
	}

    const folders = [
        'build/css',
        'build/img',
        'build/img/content',
        'build/img/icons',
        'build/fonts',
        'build/js'
    ];

    folders.forEach(dir => {
        if(!fs.existsSync(dir))     
            fs.mkdirSync(dir), 
            console.log(' folder created:', dir);        
    });
});