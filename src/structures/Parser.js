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
    
    static parseSingle(string) {
        const { key, value } = getKeyVal(string);
        const { type } = identify(string);
        const raw = string;

        switch(type) {
            case 'arg':
                return({ key: sanitize(key, 'key'), value, type, raw });
                break;
            case 'compound-arg':
                return({ key: sanitize(key, 'key'), value: sanitize(value, 'value'), type, raw });
                break;
            case 'flag':
                if (sanitize(key, 'key').length == 1) return ({ key: sanitize(key, 'key'), value: true, type, raw });
                return sanitize(key, 'key').split('').map(k => `-${k}`).map(k => Parser.parseSingle(k))
                break;
            case 'compound-flag':
                return({ key: sanitize(key, 'key'), value: true, type, raw })
                break;
            default:
                return undefined;
                break;
        };
    };
};