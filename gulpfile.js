const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('clearLib', function() {
    return del(['lib']);
});

gulp.task('compileJS', function() {
    var babelProcess = babel({
        presets: ['es2015', 'es2017'],
        plugins: ['transform-runtime']
    }).on('error', function(e) {
        console.log(e);
        process.exit(1);
    });

    return gulp.src('src/**/*.js', {
        verbose: true,
        ignoreInitial: false
    }).pipe(babelProcess).pipe(gulp.dest('lib'));
})

gulp.task('moveConfig', function() {
    return gulp.src(['src/config/**/*.*', 'src/config/**/.*'], {base: 'src/'}).pipe(gulp.dest('lib'));
});

gulp.task('default', gulp.series('clearLib', gulp.parallel('compileJS', 'moveConfig')));