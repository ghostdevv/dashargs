

# DashArgs
[![](https://img.shields.io/npm/v/dashargs?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/dashargs)
[![](https://img.shields.io/static/v1?label=Author&message=GHOST&color=informational&style=for-the-badge)](https://ghostdev.xyz)

Simple package for parsing command line style arguments.

### Install
```
npm install dashargs --save
```

### Setup
```js
const dash = require('dashargs');
```

### Command Syntax
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
```

### Parse a string
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

args.array(); // [ { key: 'title', args: 'New Project' }, { key: 'desc', args: 'Example project' } ]
```

### Config
`dash.config(options)`
```js
const dash = require('dashargs');

// Default values shown below; these will be the config options used if not changed
dash.config({
    
    unique: true,

});
```
`unique`: If true then if a arg is given twice e.g. `-x a -x b` only the first will be parsed, the others will be ignored<br>


### Methods
```
dashargs#config
dashargs#parse
<parsedString>.has(key)
<parsedString>.array()
```

### Examples

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

### Support

You can message me on discord: `GHOST#7524` or create a issue on the [github](https://github.com/ghostdevv/dashargs)
