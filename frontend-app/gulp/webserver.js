const browserSync = require('browser-sync');
const { config } = require('./variables');

module.exports = function webserver(done) {
    browserSync(config);
    done();
};
