const { identify, sanitize, getKeyVal, typeCoerce } = require('../util');

module.exports = class DashArgs {
    #parsed;

    constructor(string, config = {}) {
        this.#parsed = DashArgs._parse(string, config);

        this.#parsed.forEach(({ key, value }) => {
            if (config.unique) {
                this[key] = value;
            } else {
                if (!this[key] || !Array.isArray(this[key])) {
                    this[key] = [value];
                } else {
                    this[key].push(value);
                };
            };
        });
    };

    has(key) {
        if (!key) throw new SyntaxError('dashargs#parse(has) - must provide a key: <parsed-args>.has(\'key\')');
        if ((typeof key != 'string')) throw new TypeError('dashargs#parse(has) - given key must be a string');

        return !!this[key];
    };

    array() {
        return this.#parsed.map(({ key, value, raw }) => ({ key, value, raw }));
    };

    static _parse(string, config) {
        const pattern = /(--[^ \n]+)|(-(?:([^-\s])+)( )?(?:('(?:\.|[^'])*'|"(?:\.|[^"])*")|((?:\.|[^- \n])*)?))/gim;
        let matches = (string.match(pattern) || []).map(m => DashArgs._parseSingle(m, config)).flat();
        if (!config.parseFlags) matches = matches.filter(m => !m.type.match(/flag/gim));
        if (!config.parseArgs) matches = matches.filter(m => !m.type.match(/arg/gim));
        if (config.typeCoerce) matches = matches.map(m => ({ ...m, value: typeCoerce(m.value) }));
        return matches;
    };
    
    static _parseSingle(string) {
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
                return sanitize(key, 'key').split('').map(k => `-${k}`).map(k => DashArgs._parseSingle(k))
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