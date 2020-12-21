#!/usr/bin/env node

/*
    A example command that will allow you to input a string and mutate it in multiple ways
*/

const dash = require('dashargs');

const { string, reverse } = dash.argv();

if (!string)
    return console.log(
        'You must provide a string, for example: -string "hello world"',
    );

let output = '';

if (reverse) output = [...string].reverse().join('');

console.log(`The result is: ${output}`);
