const { DashArgs } = require('../structures');

module.exports = (string = '', options = {}) => {
    return new DashArgs(string, options);
};