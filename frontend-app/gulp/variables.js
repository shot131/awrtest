module.exports.variables = {
    DEPLOY: process.argv.includes('--deploy'),
    PRODUCTION: process.argv.includes('--production'),
    deploy_dist: {
        html: '../../public/assets/',
        js: '../../public/assets/js/',
        css: '../../public/assets/css',
    },
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css',
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
        stylus: 'src/stylus/**/*.styl',
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
