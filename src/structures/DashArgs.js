const Parser = require('./Parser.js');
const { Options } = require('../options');

module.exports = class DashArgs {
    #parser;
    #parsed;

    constructor(string = '', config = {}) {
        config = Object.assign(new Options(), config);

        this.#parser = new Parser(string, config);
        this.#parsed = this.#parser.parse();

        for (const { key, value } of this.#parsed) {
            if (config.unique) this[key] = value;
            else this[key] = [...(this[key] ? this[key] : ''), value];
        };
    };

    get string() {
        return this.#parser.string;
    };

    has(key) {
        if (!key) throw new SyntaxError('dashargs#parse(has) - must provide a key: <parsed-args>.has(\'key\')');
        if ((typeof key != 'string')) throw new TypeError('dashargs#parse(has) - given key must be a string');
        
        return !!this.get(key);
    };

    get(key) {
        if (!key) throw new SyntaxError('dashargs#parse(has) - must provide a key: <parsed-args>.has(\'key\')');
        if ((typeof key != 'string')) throw new TypeError('dashargs#parse(has) - given key must be a string');

        return this[key];
    }

    array() {
        return this.#parsed.map(({ key, value, raw }) => ({ key, value, raw }));
    };
};