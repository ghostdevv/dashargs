const DashRegex = require('../structures/DashRegex.js');

/**
 * Get the key and value from a arg
 * @param {string} string
 * @param {string} prefix
 */
module.exports = (string, prefix) => {
    const regexPattern = new DashRegex(prefix).getKeyIdentifier();
    const key = string.match(regexPattern)[0];
    const value = string.slice(key.length + 1).trim();
    return {
        key: key.trim() == '' ? undefined : key,
        value: value.trim() == '' ? undefined : value,
    };
};
