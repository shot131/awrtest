const gulp = require('gulp');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const { reload } = require('browser-sync');
const { variables } = require('./variables');

module.exports = function htmlBuild() {
    return gulp.src(variables.src.pug, { base: 'src/pug/pages' })
        .pipe(pug({ pretty: true }))
        .on('error', notify.onError({
            message: '<%= error.message %>',
            title: 'Pug',
        }))
        .pipe(gulp.dest(variables.dist.html))
        .pipe(reload({
            stream: true,
        }));
};
