var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var cache = require('gulp-cache');
var preprocess = require('gulp-preprocess');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var cssnext = require('gulp-cssnext');
var csso = require('gulp-csso');
var size = require('gulp-filesize');
var swig = require('gulp-swig');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Config start
var htmlSrc = ['./src/pages/*.html', './src/blocks/**/*.html'];
var pagesSrc = './src/pages/*.html';
var pagesDest = './build/';
var scssSrc = ['./src/blocks/**/*.scss', './src/scss/*.scss']
var mainScssSrc = './src/scss/main.scss'
var scssDest = './build/css'
var imgSrc = './src/static/images/*';
var imgDest = './build/static/images';
var iconSrc = './src/static/icons/*';
var iconDest = './build/static/icons';
var jsSrc = './src/js/*.js';
var jsDest = './build/js';
var uploadSrc = './src/static/uploads/*';
var uploadDest = './build/static/uploads';
var fontSrc = './src/static/fonts/*';
var fontDest = './build/static/fonts';
var timestamp = Math.round(+new Date());
// Config end

// Server connect
gulp.task('connect', function () {
	connect.server({
		root: 'build',
		port: 9150,
		livereload: true
	});
});

// SCSS
gulp.task('scss', function () {
	gulp.src(mainScssSrc)
        .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
        .pipe(preprocess({context: { VER: timestamp}}))
        //.pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            cascade: true,
            browsers: [ '> 1%', 'last 2 versions', 'Firefox ESR', 'ie >= 9', 'Opera 12.1' ]
        }))
        // .pipe(csscomb())
        .pipe(sourcemaps.write())
        //.pipe(cssnext({
        //  compress: true
        //}))
        //.pipe(csso())
		.pipe(gulp.dest(scssDest))
		// .pipe(size())
		.pipe(connect.reload())
		//.pipe(reload({stream:true}))
		// .pipe(notify('SCSS compiled!'));
});

// Swig == http://paularmstrong.github.io/swig/
gulp.task('swig', function() {
	gulp.src(pagesSrc)
		.pipe(newer(imgDest))
		.pipe(swig({
			defaults: { cache: false }
		}))
		.pipe(gulp.dest(pagesDest))
		.pipe(connect.reload())
		//.pipe(reload({stream:true}));
		//.pipe(notify('SWIG compiled!'));
});

// JS
gulp.task('js', function () {
	gulp.src(jsSrc)
        .pipe(sourcemaps.init())
        //.pipe(reload({stream:true}))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src/js'}))
        .pipe(gulp.dest(jsDest))
		.pipe(connect.reload())
});

// Images
gulp.task('images', function () {
	return gulp.src(imgSrc)
		.pipe(newer(imgDest))
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant({optimizationLevel: 3})]
		})))
		.pipe(gulp.dest(imgDest))
		//.pipe(reload({stream:true}));
		.pipe(connect.reload());
});

// Icons
gulp.task('icons', function () {
	return gulp.src(iconSrc)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant({optimizationLevel: 3})]
		}))
		.pipe(gulp.dest(iconDest))
		//.pipe(reload({stream:true}));
		.pipe(connect.reload());
});

// Uploads
gulp.task('uploads', function () {
	return gulp.src(uploadSrc)
		.pipe(newer(uploadSrc))
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant({optimizationLevel: 3})]
		})))
		.pipe(gulp.dest(uploadDest))
		//.pipe(reload({stream:true}));
		.pipe(connect.reload());
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src(fontSrc)
        .pipe(gulp.dest(fontDest));
});

// Watch
gulp.task('watch', function () {
	gulp.watch(scssSrc, ['scss'])
	gulp.watch(htmlSrc, ['swig'])
	gulp.watch(jsSrc, ['js'])
	gulp.watch(imgSrc, ['images'])
	gulp.watch(iconSrc, ['images'])
	gulp.watch(uploadSrc, ['uploads'])
})

// Default
gulp.task('default', ['swig', 'scss', 'js', 'images', 'icons', 'uploads', 'fonts', 'connect', 'watch'])
