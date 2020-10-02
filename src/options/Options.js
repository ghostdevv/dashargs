let defaultOptions = {
    unique: true,
    parseFlags: true,
    parseArgs: true,
    typeFix: true
};

module.exports = class Options {
    constructor() {
        this.unique = defaultOptions.unique;
        this.parseFlags = defaultOptions.parseFlags;
        this.parseArgs = defaultOptions.parseArgs,
        this.typeFix = defaultOptions.typeFix;
    };

    static defaults(opt = {}) {
        Object.assign(defaultOptions, opt);
    };
};