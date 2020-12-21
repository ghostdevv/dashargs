module.exports = {
    parse: require('./methods').parse,
    config: require('./options').Options.defaults,
    strip: require('./methods').strip,
    argv: require('./methods').argv,
};
