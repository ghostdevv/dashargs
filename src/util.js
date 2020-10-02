module.exports = {
    typeFix: typeFix,
    parseKey: parseKey,
};

function typeFix(string) {
    if (!string || (typeof string != 'string')) throw new Error('ERR: dashargs.util#typeFix - must provide a string');

    string = string.trim();
    
    if (!!Number(string)) return Number(string);
    if (string.toLowerCase() == 'true') return true;
    if (string.toLowerCase() == 'false') return false;
    
    return string;
};

function parseKey(key, val, config) {
    val = !val ? undefined : ((typeof val == 'string') && val.match(/(?:^"[^]+"$)|(?:^'[^]+'$)/gim)) ? val.slice(1, -1) : val;
    if (!val && !config.parseArgs) (config = Object.assign({}, config), config.parseArgs = true);
    if (!val) return config.parseFlags ? key.split('').map(k => this.parseKey(k, true, config)) : undefined;
    if (config.parseArgs) return ({ key: key, value: (typeof val == 'string') ? config.typeFix ? this.typeFix(val) : val : val });
    return undefined;
};