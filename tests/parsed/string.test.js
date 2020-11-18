const dash = require('../../');

test('checks that string is returning correctly', () => {
    const statement = '-a b -c "d" -e \'f\' -g -hi -j -j';

    const testOne = dash.parse(statement).string;
    
    expect(testOne).toEqual('-a b -c "d" -e \'f\' -g -hi -j -j');
});