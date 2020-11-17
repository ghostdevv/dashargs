module.exports = string => {
    const key = string.match(/(--[^ \n]+)|(-(?:([^-\s])+))/gim)[0];
    const value = string.slice(key.length + 1).trim();
    return ({ key: key.trim() == '' ? undefined : key, value: value.trim() == '' ? undefined : value });
};