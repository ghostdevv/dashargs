module.exports = (item, type) => {
    switch (type) {
        case 'key':
            return (typeof item == 'string') ? item.replace(/^-+/g, '') : item;
            break;
        case 'value':
            return ((typeof item == 'string') && item.match(/(?:^"[^]+"$)|(?:^'[^]+'$)/gim)) ? item.slice(1, -1) : item;
            break;
        default:
            return item;
            break;
    };
};