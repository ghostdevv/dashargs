const dash = require('../../');

test('check that argv is working correctly', () => {
    process.argv = [...process.argv, '--dev', '-hello', 'world'];

    const args = dash.argv();

    expect(args).toEqual({
        dev: true,
        hello: 'world',
    });
});
