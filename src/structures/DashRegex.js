module.exports = class DashRegex {
    constructor(prefix = '-') {
        this.prefix = prefix;
    };

    get() {
        return new RegExp(DashRegex.patternString.replace(new RegExp(DashRegex.standardPrefix, 'gi'), this.prefix), DashRegex.flags);
    };

    static get standardRegex() {
        return new RegExp(DashRegex.patternString, DashRegex.flags);
    };

    static get patternString() {
        return `(--[^ \\n]+)|(-(?:([^-\\s])+)( )?(?:('(?:\\.|[^'])*'|"(?:\\.|[^"])*")|((?:\\.|[^- \\n])*)?))`;
    };

    static get flags() {
        return 'gim';
    };

    static get standardPrefix() {
        return '-';
    };
};