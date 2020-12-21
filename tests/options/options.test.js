const { Options } = require('../../src/options');
const dash = require('../../');

test('check option type checking works', () => {
    expect(() =>
        dash.config({
            parse: {
                unique: 'abc',
            },
        }),
    ).toThrow(TypeError);

    dash.config({
        parse: {
            unique: false,
        },
    });

    expect(new Options('parse')).toEqual({
        ...new Options('parse'),
        unique: false,
    });
});

test('check options cloning works correctly', () => {
    const one = new Options('parse');

    const x = {
        unique: false,
        parseFlags: false,
        prefix: '-',
    };

    Options.defaults({
        parse: x,
    });

    const two = new Options('parse');

    x.unique = true;

    const three = new Options('parse');

    expect(one).not.toEqual(two);
    expect(two).toEqual(three);
});
