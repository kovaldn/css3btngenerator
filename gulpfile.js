// Include main components
var gulp = require('gulp');
var gutil = require('gulp-util');
var lr = require('tiny-lr');

// Include CSS components
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// Include JS components
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Include utilities
var rename = require("gulp-rename");
var livereload = require('gulp-livereload');
var server = lr();

var sourceLESS = 'source/less';
var targetCSS = 'css';
var sourceJS = 'source/js';
var targetJS = 'js';

var files = {
	less: [
		['main.less', 'main.min.css'],
		['jqueryui.theme.less', 'ui/jqueryui.theme.min.css']
	],
	js: [
		//['main.js', 'main.min.js']
	]
};
// LESS compilation
gulp.task('less', function () {
	for(var i = 0; i < files.less.length; i++){
		var file_source = files.less[i][0];
		var file_target = files.less[i][1];		
		gulp.src(sourceLESS + '/' + file_source)
	        .pipe(less().on('error', gutil.log))
	        .pipe(prefixer('last 10 versions'))
	        .pipe(minifycss())
	        .pipe(rename(file_target))
	        .pipe(gulp.dest(targetCSS));        	
	}        
});

gulp.task('js', function() {
    gulp.src(sourceJS + '/main.js')
        .pipe(concat("main.min.js"))
        //.pipe(uglify({mangle: true}).on('error', gutil.log))
        .pipe(gulp.dest(targetJS))        
});

// Watch for LESS and JS changes and run the respective compilers automatically
gulp.task('watch', function () {
    gulp.watch(sourceLESS + '/main.less', ['less']);
    gulp.watch(sourceLESS + '/jqueryui.theme.less', ['less']);
    //gulp.watch(sourceJS + '/main.js', ['js']);
});
