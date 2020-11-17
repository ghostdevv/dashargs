const Parser = require('./Parser.js');

module.exports = class DashArgs {
    #parsed;

    constructor(string = '', config = {}) {
        this.#parsed = new Parser(string, config).parse();

        for (const { key, value } of this.#parsed) {
            if (config.unique) this[key] = value;
            else this[key] = [...(this[key] ? this[key] : ''), value];
        };
    };

    has(key) {
        if (!key) throw new SyntaxError('dashargs#parse(has) - must provide a key: <parsed-args>.has(\'key\')');
        if ((typeof key != 'string')) throw new TypeError('dashargs#parse(has) - given key must be a string');

        return !!this[key];
    };

    array() {
        return this.#parsed.map(({ key, value, raw }) => ({ key, value, raw }));
    };
};