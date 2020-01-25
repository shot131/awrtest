const gulp = require('gulp');
const { variables } = require('./variables');

module.exports = function watcher(done) {
    gulp.watch(variables.watch.pug, gulp.series('htmlBuild'));
    gulp.watch(variables.watch.stylus, gulp.series('cssBuild'));
    gulp.watch(variables.watch.js, gulp.series('jsBuild'));
    done();
};
