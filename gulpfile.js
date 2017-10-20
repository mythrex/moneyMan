const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');

//for public folder
gulp.task('sass',() => {
	return gulp.src('public/sass/**/*.sass')
		.pipe(plumber())
    	.pipe(sass())
    	.pipe(gulp.dest('public/css'))
		.pipe(livereload());
})

gulp.task('scss',() => {
	return gulp.src('public/sass/**/*.scss')
		.pipe(plumber())
    	.pipe(sass())
    	.pipe(gulp.dest('public/css'))
		.pipe(livereload());
})

gulp.task('publicjs',() => {
	return gulp.src('public/js/**/*.js')
		.pipe(plumber())
		.pipe(livereload());
})

//for html
gulp.task('html',() => {
	return gulp.src('public/**/*.html')
		.pipe(plumber())
		.pipe(livereload());
})

//for views
gulp.task('views',() => {
	return gulp.src('views/**/*.hbs')
		.pipe(plumber());
})

//nodemon for restarting server
gulp.task('server',() => {
  var stream = nodemon({
    script: 'server.js',
    ignore: 'public/',
    ext: 'js hbs'
  });
})

//watch task
gulp.task('watch',() => {
	livereload.listen();
	gulp.watch('public/sass/**/*.sass',['sass']);
	gulp.watch('public/sass/**/*.scss',['scss']);
	gulp.watch('public/**/*.html',['html']);
  	gulp.watch('public/**/*.js',['publicjs']);
	gulp.watch('views/**/*.hbs',['views']);
})

//serving both task as default
gulp.task('default',['server','watch']);
