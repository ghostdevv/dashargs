const dash = require('../');

dash.config({
    typeFix: true,
});

const args = dash.parse('-abc --d');

test('args parse correctly', () => {
    expect(args).toEqual({ a: true, b: true, c: true, d: true });
});