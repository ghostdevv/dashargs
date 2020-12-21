const parse = require('./parse.js');

module.exports = (opt = {}) => {
    return parse(
        process.argv
            .slice(2)
            .map((x) => (x.match(/ /gm) ? `"${x}"` : x))
            .join(' '),
        opt,
    );
};
