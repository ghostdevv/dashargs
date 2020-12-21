const { parse, strip, argv } = require('./methods');

module.exports = {
    parse,
    strip,
    argv,
    config: require('./options').Options.defaults,
};
