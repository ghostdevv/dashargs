const parse = require('./parse.js');

module.exports = (opt = {}) => {
    return parse(process.argv.slice(2).join(' '), opt);
};
