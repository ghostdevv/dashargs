const priv = {}

module.exports = class DashArgs {

    constructor(string, config = {}) {

        const pattern = new RegExp(`(?:${config.prefix}(\\w+)((=||\\s)?\\w+(\\w||\\B)+)*)`, 'gi');

        let hold = string.match(pattern) || [];

        hold = hold.map(x => {
            let key = x.match(new RegExp(`(?:${config.prefix}(\\w+) ?)`, 'gi'))[0];
            let args = x.slice(key.length);
            return ({ key: key.trim().slice(config.prefix.length), args: args == '' ? undefined : args });
        });
    
        if (config.full == true) hold = hold.filter(d => (d.key && d.args));

        hold.forEach(x => {
            if (config.unique == true) {
                if (!this[x.key]) this[x.key] = x.args;
            } else {
                if (!this[x.key]) this[x.key] = [];
                if (![undefined].includes(x.args)) this[x.key].push(x.args)
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

}