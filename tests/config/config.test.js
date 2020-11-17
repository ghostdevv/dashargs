const { Options } = require('../../src/options');
const dash = require('../../');

test('checks options are managed correctly', () => {
    const a = new Options();
    dash.config({
        parseFlags: false
    });
    const b = new Options();
    expect(b).not.toEqual(a);
});

test('checks that parseFlags is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        parseArgs: true,
        parseFlags: true,
        typeCoerce: false,
        unique: true,
    });

    const testTwo = dash.parse(statement, {
        parseArgs: true,
        parseFlags: false,
        typeCoerce: false,
        unique: true,
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ test: "1" });
});

test('checks that parseArgs is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        parseArgs: true,
        parseFlags: true,
        typeCoerce: false,
        unique: true,
    });

    const testTwo = dash.parse(statement, {
        parseArgs: false,
        parseFlags: true,
        typeCoerce: false,
        unique: true,
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ a: true, b: true, db: true });
});

test('checks that unique is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        unique: true,
        typeCoerce: false,
        parseArgs: true,
        parseFlags: true
    });

    const testTwo = dash.parse(statement, {
        unique: false,
        typeCoerce: false,
        parseArgs: true,
        parseFlags: true
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ test: ["1"], a: [true, true], b: [true], db: [true] });
});

test('checks that typeCoerce is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        unique: true,
        typeCoerce: false,
        parseArgs: true,
        parseFlags: true
    });

    const testTwo = dash.parse(statement, {
        unique: true,
        typeCoerce: true,
        parseArgs: true,
        parseFlags: true
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ test: 1, a: true, b: true, db: true });
});

test('checks that prefix is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        unique: true,
        typeCoerce: false,
        parseArgs: true,
        parseFlags: true,
    });

    const testTwo = dash.parse(statement, {
        unique: true,
        typeCoerce: false,
        parseArgs: true,
        parseFlags: true,
        prefix: '-'
    });

    const testThree = dash.parse(statement, {
        unique: true,
        typeCoerce: false,
        parseArgs: true,
        parseFlags: true,
        prefix: '!'
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual(testOne);
    expect(testThree).toEqual({ });
});