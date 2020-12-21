/**
 * Create and manage regex
 */
module.exports = class DashRegex {
    /**
     * @param {string} prefix The prefix to use for regex
     */
    constructor(prefix = '-') {
        this.prefix = prefix;
    }

    /**
     * Get a standard regex pattern
     */
    get() {
        return new RegExp(
            DashRegex.patternString.replace(
                new RegExp(DashRegex.standardPrefix, 'gi'),
                this.prefix,
            ),
            DashRegex.flags,
        );
    }

    /**
     * Get a key identifier pattern
     */
    getKeyIdentifier() {
        return new RegExp(
            DashRegex.keyIdentifierPatternString.replace(
                new RegExp(DashRegex.standardPrefix, 'gi'),
                this.prefix,
            ),
            DashRegex.flags,
        );
    }

    /**
     * Standard pattern
     */
    static get patternString() {
        return `(--[^ \\n]+)|(-(?:([^-\\s])+)( )?(?:('(?:(?:\\\\\\\\)+|[^'\\\\]*|\\\\.)*'|"(?:(?:\\\\\\\\)+|[^"\\\\]*|\\\\.)*")|((?:[^- \n])*)?))`;
    }

    /**
     * Standard key indentifier pattern
     */
    static get keyIdentifierPatternString() {
        return `^(?:(--[^ \n]+)|(-(?:([^-\\s])+)))`;
    }

    /**
     * Get the flags used
     */
    static get flags() {
        return 'gim';
    }

    /**
     * Get the standard prefix
     */
    static get standardPrefix() {
        return '-';
    }
};
