module.exports = class DashRegex {
    constructor(prefix = '-') {
        this.prefix = prefix;
    };

    get() {
        return new RegExp(DashRegex.patternString.replace(new RegExp(DashRegex.standardPrefix, 'gi'), this.prefix), DashRegex.flags);
    };

    getKeyIdentifier() {
        return new RegExp(DashRegex.keyIdentifierPatternString.replace(new RegExp(DashRegex.standardPrefix, 'gi'), this.prefix), DashRegex.flags);
    };

    static get patternString() {
        return `(--[^ \\n]+)|(-(?:([^-\\s])+)( )?(?:('(?:[^'])*'|"(?:[^"])*")|((?:[^- \\n])*)?))`;
    };

    static get keyIdentifierPatternString() {
        return `^(?:(--[^ \n]+)|(-(?:([^-\\s])+)))`;
    };

    static get flags() {
        return 'gim';
    };

    static get standardPrefix() {
        return '-';
    };
};