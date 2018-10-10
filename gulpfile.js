const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const fs   = require('fs');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const gulpSequence = require('gulp-sequence');


gulp.task('watch', function () {
    gulp.watch('./control/less/*.less', ['less']);
});

gulp.task('less', function () {
    gulp.src('./control/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./control/css/'))
        // .pipe(cssmin())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest('./control/css'))

});

gulp.task('default', ['less', 'watch']);

// cleann folder before creation
gulp.task('cleanFolder', function () {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});
//create folder structure
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

gulp.task('createStyle', function () {
    gulp.src('./control/less/*.css')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./build/control/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/control/css'))
});

gulp.task('minifyCss', function () {
    gulp.src('./control/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./build/control/css'));
});

gulp.task('minifyHtml', () => {
  return gulp.src('./control/*.html')
    .pipe(htmlmin({ collapseWhitespace: true,removeComments: true }))
    .pipe(gulp.dest('./build/control/'));
});

gulp.task('copyJs', function () {
    gulp.src('./control/js/*')
        .pipe(gulp.dest('./build/control/js'));
});
gulp.task('copyAud', function () {
    gulp.src('./control/audio/*')
        .pipe(gulp.dest('./build/control/audio'));
});
gulp.task('copyFonts', function () {
    gulp.src('./control/fonts/*')
        .pipe(gulp.dest('./build/control/fonts'));
});
gulp.task('copyImg', function () {
    gulp.src('./control/img/*')
        .pipe(gulp.dest('./build/control/img'));
});
gulp.task('copyImgProj', function () {
    gulp.src('./control/imgOfProject/*')
        .pipe(gulp.dest('./build/control/imgOfProject'));
});
gulp.task('copyFav', function () {
    gulp.src('./control/*.png')
        .pipe(gulp.dest('./build/control'));
});
gulp.task('build', gulpSequence('cleanFolder', 'create','less','minifyCss','minifyHtml','copyJs','copyAud','copyFonts','copyImg','copyImgProj','copyFav'));