const parse = require('./parse.js');

/**
 * Parse the contents of argv
 * @param {ParseOptions} options
 */
module.exports = (options = {}) => {
    return parse(
        process.argv
            .slice(2)
            .map((x) => (x.match(/ /gm) ? `"${x}"` : x))
            .join(' '),
        options,
    );
};
