const { parse, strip, argv } = require('./methods');

/**
 * DashArgs
 * @module dashargs
 */
module.exports = {
    parse,
    strip,
    argv,
    config: require('./options').Options.defaults,
};
