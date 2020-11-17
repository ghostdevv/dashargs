const dash = require('../../');

test('checks that args are parsing correctly', () => {
    const statement = '-a b -c "d" -e \'f\'';

    const testOne = dash.parse(statement);
    
    expect(testOne).toEqual({ a: 'b', c: 'd', e: 'f' });
});

test('checks that quote escaping works correctly', () => {
    const statement = `-a "b\"c" -d 'e\'f' -g 'h\\'i'`;

    const testOne = dash.parse(statement);

    expect(testOne).toEqual({ });
});