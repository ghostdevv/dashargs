const getKeyVal = require('./getKeyVal.js');

module.exports = (string, prefix) => {
    const { key, value } = getKeyVal(string, prefix);
    let type;
    if (value) {
        if (value.match(/(?:^"[^]+"$)|(?:^'[^]+'$)/gim)) {
            type = 'compound-arg'
        } else {
            type = 'arg';
        };
    } else if (key && !value) {
        if (key.match(new RegExp(`(${prefix}){2}`, 'g'))) {
            type = 'compound-flag';
        } else {
            type = 'flag';
        };
    } else {
        type = undefined;
    };
    return ({ type });
};