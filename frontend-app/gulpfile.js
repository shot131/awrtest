'use strict';
const { series, parallel } = require('gulp');

const clean = require('./gulp/clean');
const htmlBuild = require('./gulp/html_build');
const cssBuild = require('./gulp/css_build');
const jsBuild = require('./gulp/js_build');
const webserver = require('./gulp/webserver');
const watcher = require('./gulp/watcher');

exports.clean = clean;
exports.htmlBuild = htmlBuild;
exports.cssBuild = cssBuild;
exports.jsBuild = jsBuild;
exports.watcher = watcher;
exports.webserver = webserver;

exports.default = series(
    clean,
    htmlBuild,
    cssBuild,
    jsBuild,
    parallel(watcher, webserver)
);
