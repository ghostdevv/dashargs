'use strict';
const options = {
    parse: {
        unique: true,
        parseFlags: true,
        parseArgs: true,
        typeCoerce: false,
        prefix: '-',
    },
    strip: {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true,
        prefix: '-',
    },
};

const typeMap = {
    parse: {
        unique: 'boolean',
        parseFlags: 'boolean',
        parseArgs: 'boolean',
        typeCoerce: 'boolean',
        prefix: 'string',
    },
    strip: {
        removeWhitespace: 'boolean',
        removeFlags: 'boolean',
        removeArgs: 'boolean',
        prefix: 'string',
    },
};

module.exports = class Options {
    constructor(type) {
        const entries = Object.entries(type ? options[type] : options);
        for (const [key, value] of entries) {
            this[key] = value;
        }
    }

    static defaults(opt = {}) {
        for (const [key] of Object.entries(opt)) {
            const item = typeMap[key],
                optionsRef = options[key];

            if (item instanceof Object) {
                const entries = Object.entries(opt[key]);
                for (const [key, value] of entries) {
                    if (item[key]) {
                        const expectedType = item[key],
                            recievedType = typeof value;

                        if (expectedType !== recievedType)
                            throw new TypeError(
                                `Expected type ${expectedType} for ${key}, recieved ${recievedType}`,
                            );

                        optionsRef[key] = value;
                    }
                }
            }
        }
    }
};
