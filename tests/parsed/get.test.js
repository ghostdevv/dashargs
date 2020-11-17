const dash = require('../../');

const statement = '-a b -c "d" -e \'f\' -g -hi -j -j';
const parsed = dash.parse(statement);

test('checks that get works for args', () => {
    const testOne = parsed.get('a');
    const testTwo = parsed.get('c');
    const testThree = parsed.get('e');
    
    expect(testOne).toEqual('b');
    expect(testTwo).toEqual('d');
    expect(testThree).toEqual('f');
});

test('checks that get works for flags', () => {
    const testOne = parsed.get('g');
    const testTwo = parsed.get('h');
    const testThree = parsed.get('i');
    
    expect(testOne).toEqual(true);
    expect(testTwo).toEqual(true);
    expect(testThree).toEqual(true);
});

test('checks that get works for invalid properties', () => {
    const testOne = parsed.get('x');
    const testTwo = parsed.get('b');
    
    expect(testOne).toEqual(undefined);
    expect(testTwo).toEqual(undefined);
});