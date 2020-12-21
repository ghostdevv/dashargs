/*
    This example uses dashargs to check if a --start flag was given,
    if it is then it will print out the values of title and description
*/

const dash = require('dashargs');

const args = dash.argv();

if (!args.start)
    return console.log('You must provide the --start flag to continue.');

const { title, description } = args;

console.log(
    `You gave a title of: ${title}\nYou gave a description of: ${description}`,
);
