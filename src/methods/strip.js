const { Options } = require('../options');
const parse = require('./parse.js');

/**
 *
 * @param {string} string The strip to strip from
 * @param {StripOptions} [options] Options for the strip function to use
 */
module.exports = (string = '', options = {}) => {
    if (typeof string != 'string')
        throw new TypeError('Expected type string dashargs#strip');

    options = Object.assign(new Options('strip'), options);

    const args = parse(string, {
        typeCoerce: false,
        unique: false,
        parseArgs: options.removeArgs,
        parseFlags: options.removeFlags,
        prefix: options.prefix,
    })
        .array()
        .map((x) => (options.removeWhitespace ? ' ' : '') + x.raw.trim());

    for (const raw of args) {
        string = string.replace(raw, '').replace(raw.trim(), '');
    }

    return string;
};
