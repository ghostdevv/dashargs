const { Options } = require('../../src/options');
const dash = require('../../');

test('checks that config is returning correctly with defaults', () => {
    const statement = '-a b -c "d" -e \'f\' -g -hi -j -j';

    const testOne = dash.parse(statement).config;

    expect(testOne).toEqual(new Options());
});

test('checks that config is returning correctly with custom config', () => {
    const statement = '-a b -c "d" -e \'f\' -g -hi -j -j';

    const testOne = dash.parse(statement, {
        parseFlags: true,
        parseArgs: false,
        unique: true,
        typeCoerce: true,
        prefix: '!'
    }).config;
    
    expect(testOne).toEqual({
        parseFlags: true,
        parseArgs: false,
        unique: true,
        typeCoerce: true,
        prefix: '!'
    });
});