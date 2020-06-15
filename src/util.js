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

function parseKey(key, val) {
    val = !val ? undefined : val;
    if (!val) return key.split('').map(k => this.parseKey(k, true))
    if ((typeof val == 'string')) val = (val.match(/^"[^]+"$/gim) || val.match(/^'[^]+'$/gim)) ? val.slice(1, -1) : val;
    return { key: key, value: (typeof val == 'string') ? this.typeFix(val) : val }
}