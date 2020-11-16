const { Options } = require('../src/options');
const dash = require('../');

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
        typeFix: false,
        unique: true,
    });

    const testTwo = dash.parse(statement, {
        parseArgs: true,
        parseFlags: false,
        typeFix: false,
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
        typeFix: false,
        unique: true,
    });

    const testTwo = dash.parse(statement, {
        parseArgs: false,
        parseFlags: true,
        typeFix: false,
        unique: true,
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ a: true, b: true, db: true });
});

test('checks that unique is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        unique: true,
        typeFix: false,
        parseArgs: true,
        parseFlags: true
    });

    const testTwo = dash.parse(statement, {
        unique: false,
        typeFix: false,
        parseArgs: true,
        parseFlags: true
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ test: ["1"], a: [true, true], b: [true], db: [true] });
});

test('checks that typeFix is working correctly', () => {
    const statement = '-test 1 -aab --db';

    const testOne = dash.parse(statement, {
        unique: true,
        typeFix: false,
        parseArgs: true,
        parseFlags: true
    });

    const testTwo = dash.parse(statement, {
        unique: true,
        typeFix: true,
        parseArgs: true,
        parseFlags: true
    });

    expect(testOne).toEqual({ test: "1", a: true, b: true, db: true });
    expect(testTwo).toEqual({ test: 1, a: true, b: true, db: true });
});