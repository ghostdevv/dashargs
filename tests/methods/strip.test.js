const dash = require('../../');

test('checks that strip is working correctly with removeWhitespace', () => {
    const statement = 'Hello -ab world, I --c am -b a a test -d "h"!';

    const testOne = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true,
    });

    const testTwo = dash.strip(statement, {
        removeWhitespace: false,
        removeFlags: true,
        removeArgs: true,
    });

    expect(testOne).toEqual('Hello I am a test !');
    expect(testTwo).toEqual('Hello  I  am  a test !');
});

test('checks that strip is working correctly with removeArgs set to false', () => {
    const statement = 'Hello World -a --b -h "a"';

    const testOne = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: false,
    });

    expect(testOne).toEqual('Hello World -h "a"');
});

test('checks that strip is working correctly with removeFlags set to false', () => {
    const statement = 'Hello World -a --b -h "a"';

    const testOne = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: false,
        removeArgs: true,
    });

    expect(testOne).toEqual('Hello World -a --b');
});

test('checks that strip is working correctly with different prefixes', () => {
    const statement = 'Hello World -a --b -h "a"';

    const testOne = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true,
        prefix: '-',
    });

    const statement2 = 'Hello World !a !!b !h "a"';

    const testTwo = dash.strip(statement2, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true,
        prefix: '!',
    });

    expect(testOne).toEqual(testTwo);
});

test('strip case test one', () => {
    const statement = 'Hello -a world';

    const testOne = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true,
        prefix: '-',
    });

    expect(testOne).toEqual('Hello');
});

test('strip case test two', () => {
    const statement = '--test case';

    const testOne = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true,
        prefix: '-',
    });

    expect(testOne).toEqual('case');
});
