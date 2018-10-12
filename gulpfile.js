const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const fs   = require('fs');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const gulpSequence = require('gulp-sequence');
const svgmin = require('gulp-svgmin');
//const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');
const gulpElevator = require('gulp-elevator');


gulp.task('watch', function () {
    gulp.watch('./control/static/less/*.less', ['less']);
});

gulp.task('less', function () {
    gulp.src('./control/static/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./control/static/css/'))
        .pipe(gulp.dest('./control/static/css'))
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
        fs.mkdirSync('build/control/static');
	}
	if(!fs.existsSync('build/start')){ 
		fs.mkdirSync('build/start');
        fs.mkdirSync('build/start/static');
	}

    const folders = [
    	'build/control/static/audio',
    	'build/control/static/css',
    	'build/control/static/fonts',
    	'build/control/static/img',
    	'build/control/static/imgOfProject',
    	 	
    	//         
    	'build/start/static/css',
    	'build/start/static/fontawesome',
    	'build/start/static/images',
    	'build/start/static/js',
    ];

    folders.forEach(dir => {
        if(!fs.existsSync(dir))     
            fs.mkdirSync(dir), 
            console.log(' folder created:', dir);        
    });
});

gulp.task('createStyle', function () {
    gulp.src('./control/static/less/*.css')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./build/control/static/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/control/static/css'))
});

gulp.task('minifyCss', function () {
    gulp.src('./control/static/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./build/control/static/css'));
});

gulp.task('minifyHtml', () => {
  return gulp.src('./control/*.html')
    .pipe(htmlmin({ collapseWhitespace: true,removeComments: true }))
    .pipe(gulp.dest('./build/control/'));
});

gulp.task('copyJsFolders', function () {
    gulp.src('./control/static/js/**?(.js)/**/**/**')
        .pipe(gulp.dest('./build/control/static/js'));
});

gulp.task('compressJs', function () {
  return gulp.src("./control/static/js/*.js")
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("./build/control/static/js"));
});

gulp.task('copyAud', function () {
    gulp.src('./control/static/audio/*')
        .pipe(gulp.dest('./build/control/static/audio'));
});

gulp.task('copyFonts', function () {
    gulp.src('./control/static/fonts/*')
        .pipe(gulp.dest('./build/control/static/fonts'));
});

gulp.task('copyImg', function () {
    gulp.src('./control/static/img/*')
        .pipe(gulp.dest('./build/control/static/img'));
});

// gulp.task('copyImgProj', function () {
//     gulp.src('./control/imgOfProject/*')
//         .pipe(gulp.dest('./build/control/imgOfProject'));
// });
gulp.task('copyImgProj', function () {
    return gulp.src('./control/static/imgOfProject/projectSVG.svg')
        .pipe(svgmin({
            plugins: [{
                removeTitle: false
            }
            ]
        }))
        .pipe(gulp.dest('./build/control/static/imgOfProject'));
});

gulp.task('copyFav', function () {
    gulp.src('./control/*.png')
        .pipe(gulp.dest('./build/control'));
});

// Подготовка основной точки проекта
gulp.task('minifyHtmlMain', () => {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true,removeComments: true }))
    .pipe(gulp.dest('./build/'));
});
gulp.task('copyFavMain', function () {
    gulp.src('./*.png')
        .pipe(gulp.dest('./build'));
});
// Подготовка папки старт

// gulp.task('minifyHtmlStart', () => {
//   return gulp.src('./start/*.html')
//     .pipe(htmlmin({ collapseWhitespace: true,removeComments: true }))
//     .pipe(gulp.dest('./build/start/'));
// });
// ulp.task('copyFavStart', function () {
//     gulp.src('./start/*.png')
//         .pipe(gulp.dest('./build/start'));
// });
// gulp.task('minifyCssStart', function () {
//     gulp.src('./start/css/*.css')
//         .pipe(cssmin())
//         .pipe(gulp.dest('./build/start/css'));
// });
gulp.task('copyStart', function () {
    gulp.src('./start/**/*')
        .pipe(gulp.dest('./build/start'));
});

gulp.task('buildStart', gulpSequence('copyStart'));
gulp.task('buildControl', gulpSequence('converter','less','minifyHtml','minifyCss','copyJsFolders','compressJs','copyAud','copyFonts','copyImg','copyImgProj','copyFav'));
gulp.task('build', gulpSequence('cleanFolder', 'create','minifyHtmlMain','copyFavMain','buildStart','buildControl'));




gulp.task('converter', () => {
  return gulp.src('./control/static/imgOfProject/notConvertProject.svg')
    .pipe(gulpElevator())
    .pipe(rename("projectSVG.svg"))
    .pipe(gulp.dest('./control/static/imgOfProject'));
});

