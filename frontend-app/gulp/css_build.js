const gulp = require('gulp');
const gulpIf = require('gulp-if');
const stylus = require('gulp-stylus');
const prefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const notify = require('gulp-notify');
const { reload } = require('browser-sync');
const { variables } = require('./variables');

module.exports = function cssBuild() {
    return gulp.src(variables.src.stylus)
        .pipe(stylus({
            'include css': true,
        }))
        .on('error', notify.onError({
            message: '<%= error.message %>',
            title: 'Styles',
        }))
        .pipe(prefixer())
        .pipe(cleanCss())
        .pipe(gulp.dest(variables.dist.css))
        .pipe(gulpIf(variables.DEPLOY, gulp.dest(variables.deploy_dist.css)))
        .pipe(reload({
            stream: true,
        }));
};
