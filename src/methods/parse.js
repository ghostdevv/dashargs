const { DashArgs } = require('../structures');
const { Options } = require('../options');

module.exports = (string = '', options = {}) => {
    return new DashArgs(string, Object.assign(new Options('parse'), options));
};
