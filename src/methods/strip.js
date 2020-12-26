const { Options } = require('../options');
const { Parser } = require('../structures');

/**
 *
 * @param {string} string The strip to strip from
 * @param {StripOptions} [options] Options for the strip function to use
 */
module.exports = (string = '', options = {}) => {
    if (typeof string != 'string')
        throw new TypeError('Expected type string dashargs#strip');

    options = Object.assign(new Options('strip'), options);

    const parser = new Parser(string, {
        typeCoerce: false,
        unique: false,
        parseArgs: options.removeArgs,
        parseFlags: options.removeFlags,
        prefix: options.prefix,
    });

    const parsed = parser.parse().map(({ raw }) => raw.trim());

    for (const item of parsed) {
        string = string.replace(new RegExp(item, 'gim'), '');
    }

    if (options.removeWhitespace)
        string = string
            .split(' ')
            .filter((x) => x.trim() != '')
            .map((x) => x.trim())
            .join(' ');

    return string;
};
