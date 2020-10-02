const { Options } = require('../options');
const { DashArgs } = require('../structures');

module.exports = (string = '', options = {}) => {
    return new DashArgs(string, Object.assign(new Options(), options));
};