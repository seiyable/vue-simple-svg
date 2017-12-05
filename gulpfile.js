var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('js', function () {
    gulp.src('src/plugin.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
    }
);

gulp.task('default', ['js'])
