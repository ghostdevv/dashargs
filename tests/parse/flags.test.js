const dash = require('../../');

test('checks that flags are parsing correctly', () => {
    const statement = '-a -bcd -e -e';

    const testOne = dash.parse(statement);
    
    expect(testOne).toEqual({ a: true, b: true, c: true, d: true, e: true });
});