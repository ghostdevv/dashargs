const priv = {}
const util = require('./util.js');

module.exports = class DashArgs {
    constructor(string, config = {}) {
        const pattern = /(?:(-){1}([^-\s])+)( )?(?:('(?:\.|[^'])*'|"(?:\.|[^"])*")|((?:\.|[^- \n])*)?)/gim;

        const hold = string.match(pattern) || [];
        let parsedArgs = [];

        hold.forEach(x => {
            let key = x.match(/^(?:(-){1}([^-\s])+)/gim)[0].trim().slice(1);
            let val = x.slice(key.length + 1).trim();
            let par = util.parseKey(key, val, config);
            Array.isArray(par) ? parsedArgs = parsedArgs.concat(par) : !par ? '' : parsedArgs.push(par);
        });
        

        parsedArgs.forEach(x => {
            if (config.unique == true) {
                if (!this[x.key]) this[x.key] = x.value;
            } else {
                if (!this[x.key]) this[x.key] = [];
                if (![undefined].includes(x.value)) this[x.key].push(x.value);
            };
        });

        priv.config = config;
    };

    has(key) {
        if (!key) throw new Error('dashargs#parse(has) - must provide a key: <parsed-args>.has(\'key\')');
        if ((typeof key != 'string')) throw new SyntaxError('dashargs#parse(has) - given key must be a string');

        return !!this.array().filter(x => x.key == key)[0];
    };

    array() {
        return Object.keys(this).map(key => ({ key: key, args: this[key] }));
    };
};