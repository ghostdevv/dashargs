#!/usr/bin/env node

/*
    A example command that will allow you to input a string and mutate it in multiple ways

    for example:
    command -input "Hello World" --reverse --caps
*/

const dash = require('dashargs');

const { input, reverse, caps, lower } = dash.argv();

if (!input)
    return console.log(
        'You must provide a string, for example: -input "hello world"',
    );

let output = input;

if (reverse) output = [...output].reverse().join('');
if (caps) output = output.toUpperCase();
if (lower) output = output.toLowerCase();

console.log(`The result is: ${output}`);
