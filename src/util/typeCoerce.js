module.exports = (item = '') => {
    if (typeof item != 'string') return item;

    item = item.trim();

    if (!isNaN(Number(item))) return Number(item);
    if (item.toLowerCase() == 'true') return true;
    if (item.toLowerCase() == 'false') return false;
    
    return item;
};