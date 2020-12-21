const Parser = require('./Parser.js');

/**
 * The main class for parsed args
 */
module.exports = class DashArgs {
    #parser;
    #parsed;

    /**
     * @param {string} string The string to parse
     * @param {ParseOptions} [config] The options used when parsing
     */
    constructor(string = '', config = {}) {
        this.#parser = new Parser(string, config);
        this.#parsed = this.#parser.parse();

        for (const { key, value } of this.#parsed) {
            if (['string', 'config'].includes(key))
                throw new Error(
                    `${key} is a reserved key, you are unable to use it`,
                );

            if (config.unique) this[key] = value;
            else this[key] = [...(this[key] ? this[key] : ''), value];
        }
    }

    /**
     * Get the string used when parsing
     */
    get string() {
        return this.#parser.string;
    }

    /**
     * Get the config used when parsing
     */
    get config() {
        return this.#parser.config;
    }

    /**
     * Check if there is a arg/flag with a given key
     * @param {string} key
     */
    has(key) {
        if (!key)
            throw new SyntaxError(
                "dashargs#parse(has) - must provide a key: <parsed-args>.has('key')",
            );
        if (typeof key != 'string')
            throw new TypeError(
                'dashargs#parse(has) - given key must be a string',
            );

        return !!this.get(key);
    }

    /**
     * Get a arg/flag by key
     * @param {string} key
     */
    get(key) {
        if (!key)
            throw new SyntaxError(
                "dashargs#parse(has) - must provide a key: <parsed-args>.has('key')",
            );
        if (typeof key != 'string')
            throw new TypeError(
                'dashargs#parse(has) - given key must be a string',
            );

        return this[key];
    }

    /**
     * Convert all the args in array form
     */
    array() {
        return this.#parsed.map(({ key, value, raw }) => ({ key, value, raw }));
    }
};
