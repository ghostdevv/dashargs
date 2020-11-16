const parse = require('./parse.js');

module.exports = (string = '', { removeWhitespace, removeFlags, removeArgs } = { removeWhitespace: true, removeFlags: true, removeArgs: true }) => {
    if ((typeof string != 'string')) throw new TypeError('Expected type string dashargs#strip');

    const args = parse(string, {
        typeCoerce: false,
        unique: false,
        parseArgs: removeArgs,
        parseFlags: removeFlags
    })
    .array()
    .map(x => (removeWhitespace ? ' ' : '') + x.raw.trim());

    for (const raw of args) {
        string = string.replace(raw, '').replace(raw.trim(), '');
    };

    return string;
};