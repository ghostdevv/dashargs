const { identify, sanitize, getKeyVal, typeCoerce } = require('../util');
const DashRegex = require('./DashRegex.js');

/**
 * Parse a string to raw argument data
 */
module.exports = class Parser {
    #string;
    #config;

    /**
     *
     * @param {string} string The string to parse
     * @param {ParseOptions} config The options to use when parsing
     */
    constructor(string = '', config = {}) {
        this.#string = string;
        this.#config = config;
    }

    /**
     * Returns the string that was given to parse
     */
    get string() {
        return this.#string;
    }

    /**
     * Returns the config that was given when parsing
     */
    get config() {
        return this.#config;
    }

    /**
     * Parse the string given
     */
    parse() {
        const regexPattern = new DashRegex(this.#config.prefix).get();
        let matches = (this.#string.match(regexPattern) || [])
            .map((m) => Parser.parseSingle(m, this.#config.prefix))
            .flat();
        if (!this.#config.parseFlags)
            matches = matches.filter((m) => !m.type.match(/flag/gim));
        if (!this.#config.parseArgs)
            matches = matches.filter((m) => !m.type.match(/arg/gim));
        if (this.#config.typeCoerce)
            matches = matches.map((m) => ({
                ...m,
                value: typeCoerce(m.value),
            }));
        return matches;
    }

    /**
     * Parse a single argument/flag
     * @param {string} string The argument/flag to parse
     * @param {string} prefix The prefix to use
     */
    static parseSingle(string, prefix) {
        const keyVal = getKeyVal(string, prefix);
        const { type } = identify(string, prefix);
        const raw = string;

        const key = sanitize(keyVal.key, 'key', prefix);
        const value = sanitize(keyVal.value, 'value', prefix);

        switch (type) {
            case 'arg':
                return { key, value, type, raw };
                break;
            case 'compound-arg':
                return { key, value, type, raw };
                break;
            case 'flag':
                if (key.length == 1) return { key, value: true, type, raw };
                return key
                    .split('')
                    .map((k) => `${prefix}${k}`)
                    .map((k) => Parser.parseSingle(k, prefix));
                break;
            case 'compound-flag':
                return {
                    key: sanitize(key, 'key', prefix),
                    value: true,
                    type,
                    raw,
                };
                break;
            default:
                return undefined;
                break;
        }
    }
};
