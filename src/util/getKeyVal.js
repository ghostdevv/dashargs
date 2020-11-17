const DashRegex = require('../structures/DashRegex.js');

module.exports = (string, prefix) => {
    const regexPattern = new DashRegex(prefix).getKeyIdentifier();
    const key = string.match(regexPattern)[0];
    const value = string.slice(key.length + 1).trim();
    return ({ key: key.trim() == '' ? undefined : key, value: value.trim() == '' ? undefined : value });
};