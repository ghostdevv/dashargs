const dash = require('../');

const command = '-a 1';
const args = dash.parse(command);

test('check if parsedArgs#has method works', () => {
    expect(args.has('a')).toBeTruthy();
    expect(args.has('x')).toBeFalsy();
});