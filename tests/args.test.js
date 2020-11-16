const dash = require('../');

dash.config({
    typeCoerce: false,
});

const args = dash.parse('-a 1 -b "1" -c "1 1"');

test('args parse correctly', () => {
    expect(args).toEqual({ a: '1', b: '1', c: '1 1' });
});