/**
 * Try to change a string to it's actual type
 * @param {string} item
 */
module.exports = (item = '') => {
    if (typeof item != 'string') return item;

    item = item.trim();

    if (!isNaN(Number(item))) return Number(item);
    if (item.toLowerCase() == 'true') return true;
    if (item.toLowerCase() == 'false') return false;

    const object = tryJSON(item);
    if (object) return object;

    return item;
};

function tryJSON(string) {
    try {
        const object = JSON.parse(string);
        return object;
    } catch {
        return undefined;
    }
}
