const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
    return gulp.src('build', { read: false })
    .pipe(clean());
});

gulp.task('build', ['clean'], () => {
    const tsResult = tsProject.src()
    .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);