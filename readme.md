# DashArgs
[![](https://img.shields.io/npm/v/dashargs?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/dashargs)
[![](https://img.shields.io/static/v1?label=Author&message=GHOST&color=informational&style=for-the-badge)](https://ghostdev.xyz)

Simple package for parsing command line style arguments.

## Requirements
```
NodeJS >= v12.x
```

# Install
```
npm install dashargs
```

# Setup
```js
const dash = require('dashargs');
```

# Command Syntax
```
# Arguments:
    Arguments have the structure of this:
        -key <value>
    Arguments with a value of more than one word must be wrapped in quotes:
        -key '<multi word value>'
        or
        -key "<multi word value>"

# Flags:
    Flags are one character long and have the structure of this:
        -a
    Flags are stackable and when joined together all get parsed as individuals
        -abc
        is the same as
        -a -b -c

# Compound Flags:
    Compound flags are the same as flags but are parsed differently:
        --a
    They can be multiple characters long as they aren't split
        --abc -> { abc: true }
```

# Parse a string
`dash.parse(string, options)`<br>
The options is an object and has the same points shown below in the config section, these will take priority over the set config, leave blank to use the ones set in the config
```js
const dash = require('dashargs');

let command = 'setup -title "New Project" -desc "Example project"' // Example command
const args = dash.parse(command);

args // { title: 'New Project', desc: 'Example project' }

/*
    Parsed String Methods:
*/

args.has('title'); // true
args.has('x'); // false

args.array(); // [ { key: 'title', value: 'New Project' }, { key: 'desc', value: 'Example project' } ]
```

# Config
`dash.config(options)`
```js
const dash = require('dashargs');

// Default values shown below; these will be the config options used if not changed
dash.config({
    unique: true,
    parseFlags: true,
    parseArgs: true,
    typeFix: true
});
```
`unique`: If true then if a arg is given twice e.g. `-x a -x b` only the first will be parsed, the others will be ignored<br>
`parseFlags`: If false then flags will not be parsed by dashargs<br>
`parseArgs`: If false then args will not be parsed by dashargs<br>
`typeFix`: If true then it will try to convert values to their "correct" types, e.g the string "1" to the number 1<br>


# Methods
```
config
parse
<parsedString>.has(key)
<parsedString>.array()
```

# Examples

```js
/*
    CONFIG > unique
    default: true
*/

const exampleCommand = 'setup -new true -new false';

let args = dash.parse(exampleCommand, {
    unique: false
});

console.log(args) // { new: ['true', 'false'] }

let args2 = dash.parse(exampleCommand, {
    unique: true
});

console.log(args2); // { new: 'true' }
```
```js
/*
    CONFIG > parseFlags
    default: true
*/

const exampleCommand = 'setup -ab -new thing --dd';

let args = dash.parse(exampleCommand, {
    parseFlags: true
});

console.log(args) // { a: true, b: true, new: 'thing', dd: true }

let args2 = dash.parse(exampleCommand, {
    parseFlags: false
});

console.log(args2) // { new: 'thing' }
```
```js
/*
    CONFIG > parseArgs
    default: true
*/

const exampleCommand = 'setup -ab -new thing';

let args = dash.parse(exampleCommand, {
    parseArgs: true
});

console.log(args) // { a: true, b: true, new: 'thing' }

let args2 = dash.parse(exampleCommand, {
    parseArgs: false
});

console.log(args2) // { a: true, b: true }
```
```js
/*
    CONFIG > typeFix
    default: true
*/

const exampleCommand = '-new 1';

let args = dash.parse(exampleCommand, {
    typeFix: true
});

console.log(args) // { new: 1 }

let args2 = dash.parse(exampleCommand, {
    typeFix: false
});

console.log(args2) // { new: '1' }
```

# Support

You can message me on discord: `GHOST#7524`<br>
Join the [discord](https://discord.gg/r2JQfuH)<br>
Create a issue on the [github](https://github.com/ghoststools/djs-ticketsystem)