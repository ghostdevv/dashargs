const dash = require('../../');

const statement = '-a b -c "d" -e \'f\' -g -hi -j -j';
const parsed = dash.parse(statement);

test('checks that has works for args', () => {
    const testOne = parsed.has('a');
    const testTwo = parsed.has('c');
    const testThree = parsed.has('e');
    
    expect(testOne).toEqual(true);
    expect(testTwo).toEqual(true);
    expect(testThree).toEqual(true);
});

test('checks that has works for flags', () => {
    const testOne = parsed.has('g');
    const testTwo = parsed.has('h');
    const testThree = parsed.has('i');
    
    expect(testOne).toEqual(true);
    expect(testTwo).toEqual(true);
    expect(testThree).toEqual(true);
});

test('checks that has works for invalid properties', () => {
    const testOne = parsed.has('x');
    const testTwo = parsed.has('b');
    
    expect(testOne).toEqual(false);
    expect(testTwo).toEqual(false);
});