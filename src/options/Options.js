const defaultOptions = {
    unique: true,
    parseFlags: true,
    parseArgs: true,
    typeCoerce: false,
    prefix: '-',
};

module.exports = class Options {
    constructor() {
        this.unique = defaultOptions.unique;
        this.parseFlags = defaultOptions.parseFlags;
        this.parseArgs = defaultOptions.parseArgs,
        this.typeCoerce = defaultOptions.typeCoerce;
        this.prefix = defaultOptions.prefix;
    };

    static defaults(opt = {}) {
        Object.assign(defaultOptions, opt);
    };
};