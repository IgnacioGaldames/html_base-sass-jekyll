var landingName = "landing_base";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
//var useref = require('gulp-useref');
//var uglify = require('gulp-uglify');
//var gulpIf = require('gulp-if');

const child = require('child_process');
    
/*
gulp.task('useref', function(){
    return gulp.src('_site/*.html')
      .pipe(useref())
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest('_site'))
});
*/

gulp.task('sass', function() {
    return gulp.src('sass/cardumen.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(landingName + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('jekyll', function() {
    const jekyll = child.spawn('jekyll', ['build','--watch', '--incremental'])
    return gulp.src(landingName)
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: landingName,
            port: 4000
        },
    })
});

gulp.task('watch', ['sass', 'jekyll', 'browserSync'], function() {
    gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], ['sass','jekyll']);
    // Other watchers
    gulp.watch(['_source/**/*'], ['jekyll']);
    gulp.watch(landingName + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['watch'], function() {

})