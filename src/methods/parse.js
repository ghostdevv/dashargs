const { DashArgs } = require('../structures');
const { Options } = require('../options');

/**
 * Parse a string to arguments
 *
 * @param {string} string The string to parse
 * @param {ParseOptions} [options] Parse options
 */
module.exports = (string = '', options = {}) => {
    return new DashArgs(string, Object.assign(new Options('parse'), options));
};
