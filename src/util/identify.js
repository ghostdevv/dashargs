const getKeyVal = require('./getKeyVal.js');

module.exports = string => {
    const { key, value } = getKeyVal(string);
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
    return ({ type });
};