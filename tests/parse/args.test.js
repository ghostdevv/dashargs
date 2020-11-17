const dash = require('../../');

test('checks that args are parsing correctly', () => {
    const statement = '-a b -c "d" -e \'f\'';

    const testOne = dash.parse(statement);
    
    expect(testOne).toEqual({ a: 'b', c: 'd', e: 'f' });
});

// test('checks that quote escaping works correctly for "', () => {
//     const statement = `-a "b\"c" -d "e\\"g"`;

//     const testOne = dash.parse(statement);

//     expect(testOne).toEqual({ });
// });

// test('checks that quote escaping works correctly for "', () => {
//     const statement = `-a 'b\'c' -d 'e\\'g'`;

    const testOne = dash.parse(statement);

    expect(testOne).toEqual({ });
});