const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const fs   = require('fs');
const clean = require('gulp-clean');

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
		fs.mkdirSync('build');
	}
	if(!fs.existsSync('build/control')){ 
		fs.mkdirSync('build/control');
	}
	if(!fs.existsSync('build/start')){ 
		fs.mkdirSync('build/start');
	}

    const folders = [
    	'build/control/audio',
    	'build/control/css',
    	'build/control/fonts',
    	'build/control/img',
    	'build/control/imgOfProject',
    	'build/control/less',    	
    	//         
    	'build/start/css',
    	'build/start/fontawesome',
    	'build/start/images',
    	'build/start/js',
    ];

    folders.forEach(dir => {
        if(!fs.existsSync(dir))     
            fs.mkdirSync(dir), 
            console.log(' folder created:', dir);        
    });
});