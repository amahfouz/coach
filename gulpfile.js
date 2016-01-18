var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
 
gulp.task('lint', function() {
  return gulp.src('app/ng/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compile-sass', function() {
    gulp.src('app/assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/assets/css/'));
});

gulp.task('main-bower-files', function() {
    gulp.src(mainBowerFiles(), { base: 'app/bower_components' })
        .pipe(gulp.dest("app/lib"))
});

gulp.task('copy-additional-bower-files', function(){
	gulp.src(['app/bower_components/bootstrap/dist/css/bootstrap.css',
		      'app/bower_components/bootstrap/dist/fonts/**',
		      'app/bower_components/components-font-awesome/**',
		      'app/bower_components/angular-strap/dist/modules/parse-options.js',
		      'app/bower_components/angular-strap/dist/modules/tooltip.js',
		      'app/bower_components/angular-strap/dist/modules/dimensions.js',
		      'app/bower_components/angular-strap/dist/modules/modal.js',
		      'app/bower_components/angular-strap/dist/modules/select.js',
		      'app/bower_components/angular-strap/dist/modules/popover.js',], { base: 'app/bower_components' })
		.pipe(gulp.dest("app/lib"))
});

//Watch task
gulp.task('watch-sass',function() {
    gulp.watch('app/assets/sass/*.scss',['compile-sass']);
});

gulp.task('default', ['compile-sass', 'main-bower-files', 'copy-additional-bower-files']);