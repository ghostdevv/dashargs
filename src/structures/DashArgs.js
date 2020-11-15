const priv = {};

module.exports = class DashArgs {
    constructor(string, config = {}) {
        priv._parsed = DashArgs._parse(string, config);

        priv._parsed.forEach(({ key, value }) => {
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
        if (!key) throw new Error('dashargs#parse(has) - must provide a key: <parsed-args>.has(\'key\')');
        if ((typeof key != 'string')) throw new SyntaxError('dashargs#parse(has) - given key must be a string');

        return !!this.array().filter(x => x.key == key)[0];
    };

    array() {
        return priv._parsed.map(({ key, value, raw }) => ({ key, value, raw }));
    };

    static _typeFix(item = '') {
        if (typeof item != 'string') return item;
    
        item = item.trim();
    
        if (!isNaN(Number(item))) return Number(item);
        if (item.toLowerCase() == 'true') return true;
        if (item.toLowerCase() == 'false') return false;
        
        return item;
    };
    
    static _parse(string, config) {
        const pattern = /(--[^ \n]+)|(-(?:([^-\s])+)( )?(?:('(?:\.|[^'])*'|"(?:\.|[^"])*")|((?:\.|[^- \n])*)?))/gim;
        let matches = (string.match(pattern) || []).map(m => DashArgs._parseSingle(m, config)).flat();
        if (!config.parseFlags) matches = matches.filter(m => !m.type.match(/flag/gim));
        if (!config.parseArgs) matches = matches.filter(m => !m.type.match(/arg/gim));
        if (config.typeFix) matches = matches.map(m => ({ ...m, value: DashArgs._typeFix(m.value) }));
        return matches;
    };
    
    static _parseSingle(string) {
        const { key, value } = DashArgs._getKeyVal(string);
        const { type } = DashArgs._identify(string);
        const raw = string;

        switch(type) {
            case 'arg':
                return({ key: DashArgs._sanitize(key, 'key'), value, type, raw });
                break;
            case 'compound-arg':
                return({ key: DashArgs._sanitize(key, 'key'), value: DashArgs._sanitize(value, 'value'), type, raw });
                break;
            case 'flag':
                if (DashArgs._sanitize(key, 'key').length == 1) return ({ key: DashArgs._sanitize(key, 'key'), value: true, type, raw });
                return DashArgs._sanitize(key, 'key').split('').map(k => `-${k}`).map(k => DashArgs._parseSingle(k))
                break;
            case 'compound-flag':
                return({ key: DashArgs._sanitize(key, 'key'), value: true, type, raw })
                break;
            default:
                return undefined;
                break;
        };
    };
    
    static _identify(string) {
        const { key, value } = DashArgs._getKeyVal(string);
        let type;
        if (value) {
            if (value.match(/(?:^"[^]+"$)|(?:^'[^]+'$)/gim)) {
                type = 'compound-arg'
            } else {
                type = 'arg';
            };
        } else if (key && !value) {
            if (key.match(/(-){2}/g)) {
                type = 'compound-flag';
            } else {
                type = 'flag';
            };
        } else {
            type = undefined;
        };
        return ({ type })
    };
    
    static _getKeyVal(string) {
        const key = string.match(/(--[^ \n]+)|(-(?:([^-\s])+))/gim)[0];
        const value = string.slice(key.length + 1).trim();
        return ({ key: key.trim() == '' ? undefined : key, value: value.trim() == '' ? undefined : value });
    };
    
    static _sanitize(item, type) {
        switch(type) {
            case 'key':
                return (typeof item == 'string') ? item.replace(/-/g, '') : item;
                break;
            case 'value':
                return ((typeof item == 'string') && item.match(/(?:^"[^]+"$)|(?:^'[^]+'$)/gim)) ? item.slice(1, -1) : item;
                break;
            default:
                return item;
                break;
        };
    };
};