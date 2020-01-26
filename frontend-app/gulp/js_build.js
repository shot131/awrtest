const gulp = require('gulp');
const gulpIf = require('gulp-if');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const notify = require('gulp-notify');
const { variables } = require('./variables');

const config = {
    mode: variables.PRODUCTION ? 'production' : 'development',
    output: {
        filename: '[name].js',
        library: '[name]',
        publicPath: variables.PRODUCTION ? variables.deploy_dist.public_path : variables.dist.public_path,
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: { version: 3, proposals: false },
                            modules: false,
                            loose: true,
                        },
                    ],
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
            exclude: /node_modules/,
        }],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                polyfills: {
                    test: /[\\/]core-js[\\/]/,
                    name: 'polyfills',
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
    },
};

module.exports = function jsBuild() {
    return gulp.src(variables.src.js)
        .pipe(named())
        .pipe(webpack(config, null))
        .on('error', function(error) {
            notify.onError({
                message: '<%= error.message %>',
                title: 'Webpack',
            });
            this.emit('end');
        })
        .pipe(gulp.dest(variables.dist.js))
        .pipe(gulpIf(variables.DEPLOY, gulp.dest(variables.deploy_dist.js)));
};
