const rimraf = require('rimraf');
const { variables } = require('./variables');

module.exports = function clean(done) {
  rimraf(variables.clean, done);
};
