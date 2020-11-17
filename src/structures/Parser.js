const { identify, sanitize, getKeyVal, typeCoerce } = require('../util');
const DashRegex = require('./DashRegex.js');

module.exports = class Parser {
    #string;
    #config;

    constructor(string = '', config = {}) {
        this.#string = string;
        this.#config = config;
    };

    parse() {
        const regexPattern = new DashRegex(this.#config.prefix).get();
        let matches = (this.#string.match(regexPattern) || []).map(m => Parser.parseSingle(m, this.#config.prefix)).flat();
        if (!this.#config.parseFlags) matches = matches.filter(m => !m.type.match(/flag/gim));
        if (!this.#config.parseArgs) matches = matches.filter(m => !m.type.match(/arg/gim));
        if (this.#config.typeCoerce) matches = matches.map(m => ({ ...m, value: typeCoerce(m.value) }));
        return matches;
    };
    
    static parseSingle(string, prefix) {
        const keyVal = getKeyVal(string, prefix);
        const { type } = identify(string, prefix);
        const raw = string;

        const key = sanitize(keyVal.key, 'key', prefix);
        const value = sanitize(keyVal.value, 'value', prefix);

        switch(type) {
            case 'arg':
                return({ key, value, type, raw });
                break;
            case 'compound-arg':
                return({ key, value, type, raw });
                break;
            case 'flag':
                if (key.length == 1) return ({ key, value: true, type, raw });
                return key.split('').map(k => `${prefix}${k}`).map(k => Parser.parseSingle(k, prefix))
                break;
            case 'compound-flag':
                return({ key: sanitize(key, 'key', prefix), value: true, type, raw })
                break;
            default:
                return undefined;
                break;
        };
    };
};