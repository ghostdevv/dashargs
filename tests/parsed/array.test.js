const dash = require('../../');

test('checks that arrays are parsing correctly', () => {
    const statement = '-a b -c "d" -e \'f\' -g -hi -j -j';

    const testOne = dash.parse(statement).array();
    
    expect(testOne).toEqual([
        { key: 'a', value: 'b', raw: '-a b' },
        { key: 'c', value: 'd', raw: '-c "d"' },
        { key: 'e', value: 'f', raw: "-e 'f'" },
        { key: 'g', value: true, raw: '-g ' },
        { key: 'h', value: true, raw: '-h' },
        { key: 'i', value: true, raw: '-i' },
        { key: 'j', value: true, raw: '-j ' },
        { key: 'j', value: true, raw: '-j' }
    ]);
});