

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

### Parse a string
`dash.parse(string, options)`<br>
The options is an object and has the same points shown below in the config section, these will take priority over the set config, leave blank to use the ones set in the config
```js
const dash = require('dashargs');

let command = 'setup --title New Project --desc Example project' // Example command
const args = dash.parse(command);

console.log(args); // { title: 'New Project', desc: 'Example project' }

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
    
    full: false,
    unique: true,
    prefix: '--',

});
```
`full`: If true when the arg only has a key e.g. `--x` it will be ignored<br>
`unique`: If true then if a arg is given twice e.g. `--x a --x b` only the first will be parsed, the others will be ignored<br>
`prefix`: Ability to change the prefix that dashargs looks for


### Methods
```
dashargs#config
dashargs#parse
<parsedString>.has(key)
<parsedString>.array(key)
```

### Examples
```js
/*
    CONFIG > FULL
    default: false
*/

const exampleCommand = 'setup --a b --new';

let args = dash.parse(exampleCommand, {
    full: false
});

console.log(args); // { new: undefined, a: 'b' }

let args2 = dash.parse(exampleCommand, {
    full: true
});

console.log(args2); // { a: 'b' }
```
```js
/*
    CONFIG > unique
    default: true
*/

const exampleCommand = 'setup --new true --new false';

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
    CONFIG > prefix
    default: '--'
*/

const exampleCommand = 'setup --new true ==new false';

let args = dash.parse(exampleCommand, {
    prefix: '=='
});

console.log(args); // { new: 'false' }
```

### Support

You can message me on discord: `GHOST#7524` or create a issue on the [github](https://github.com/ghostdevv/dashargs)
