module.exports.variables = {
    DEPLOY: process.argv.includes('--deploy'),
    PRODUCTION: process.argv.includes('--production'),
    deploy_dist: {
        html: '../awrtest/static/awrtest/',
        js: '../awrtest/static/awrtest/js/',
        css: '../awrtest/static/awrtest/css',
        public_path: '/static/awrtest/js/',
    },
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css',
        public_path: 'js/',
    },
    src: {
        pug: [
            'src/pug/pages/*.pug',
        ],
        js: [
            'src/js/pages/*.js',
        ],
        stylus: [
            'src/stylus/pages/*.styl',
        ],
    },
    watch: {
        pug: 'src/pug/**/*.pug',
        js: 'src/js/**/*.js',
        stylus: [
            'src/stylus/**/*.styl',
            'src/stylus/**/*.css',
        ],
    },
    clean: './dist',
};

module.exports.config = {
    server: {
        baseDir: './dist',
    },
    open: false,
    host: 'localhost',
    port: 3000,
};
