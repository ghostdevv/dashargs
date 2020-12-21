/**
 * Sanitize a key or value
 * @param {*} item
 * @param {string} type
 * @param {string} prefix
 */
module.exports = (item, type, prefix) => {
    switch (type) {
        case 'key':
            return typeof item == 'string'
                ? item.replace(new RegExp(`^${prefix}+`, 'g'), '')
                : item;
            break;
        case 'value':
            return typeof item == 'string' &&
                item.match(/(?:^"[^]+"$)|(?:^'[^]+'$)/gim)
                ? item.slice(1, -1)
                : item;
            break;
        default:
            return item;
            break;
    }
};
