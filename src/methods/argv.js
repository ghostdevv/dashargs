const parse = require('./parse.js');

/**
 * Parse the contents of argv
 * @param {ParseOptions} options
 */
module.exports = (options = {}) => {
    /* prettier-ignore */
    return parse(
        process.argv
            .slice(2)
            .map((x, i) => (x.match(/ /gm) || !(x.match(/"'/gm) || process.argv.slice(2)[i].startsWith(options.prefix || '-')) ? `"${x}"` : x))
            .join(' '),
        options,
    );
};
