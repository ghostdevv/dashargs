const dash = require('../');

dash.config({
    typeCoerce: false,
});

const args = dash.parse('-abc --d');

test('flags parse correctly', () => {
    expect(args).toEqual({ a: true, b: true, c: true, d: true });
});