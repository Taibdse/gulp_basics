const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// TOP LEVEL FUNCTIONS

// gulp.task - Define task
// gulp.src - Point to the files to use
// gulp.dest - Point to the folder to output
// gulp.watch - Watch files and folders fot changes

//Logs message
gulp.task('message', async function(){
    return console.log('Gulp is running...');
})

//COPY ALL HTML FILES 
gulp.task('copyHtml', function(){
    return gulp.src('src/*.html').pipe(gulp.dest('dist'));
})

gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('minify', function(){
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})

//compile sass
gulp.task('sass', function(){
    return gulp.src('src/sass/*.scss')
     .pipe(sass().on('error', sass.logError))
    .pipe((gulp.dest('dist/css')))
})

//Scripts
gulp.task('scripts', function(){
    return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})

// gulp.task('default', ['message', 'copyHtml', 'imagemin', 'minify', 'sass']);
gulp.task('default', gulp.series('message', 'copyHtml', 'imagemin', 'sass', 'scripts'));

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'))
    gulp.watch('src/images/*', gulp.series('imagemin'))
    gulp.watch('src/sass/*.sass', gulp.series('sass'))
    gulp.watch('src/*.html', gulp.series('copyHtml'))
})
