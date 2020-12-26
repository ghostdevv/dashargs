# DashArgs
[![](https://img.shields.io/npm/v/dashargs?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/dashargs)
[![](https://img.shields.io/static/v1?label=Project%20Creator&message=GHOST&color=informational&style=for-the-badge)](https://ghostdev.xyz)
[![](https://img.shields.io/github/workflow/status/ghoststools/dashargs/CI/master?style=for-the-badge)](https://github.com/ghoststools/dashargs)
[![](https://img.shields.io/static/v1?label=&message=A%20GHOSTs%20Tools%20Project&color=informational&style=for-the-badge)](https://github.com/ghoststools)

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
Node JS
```js
const dash = require('dashargs');
```
Typescript
```ts
import { parse, config, strip } from 'dashargs';
```
For es imports such as the TypeScript import it's recommened you only import the methods you need

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
```

# Argv shortcut
If you want to parse the arguments on `process.argv` dashargs includes a shortcut method to do this: `dash.argv(options)`
```js
const dash = require('dashargs');

// Let's say the command was node . --dev
const args = dash.argv();

args // { dev: true }
```

# Global Config
`dash.config(options)`<br>
You are able to set the default config used for every dashargs method. You just provide a object with the key being the method name, for exmaple:
```js
const dash = require('dashargs');

dash.config({
    parse: {
        unique: true,
        typeCoerce: false,
    },
    strip: {
        removeWhitespace: true,
    },
});
```
The above will update the config used by the methods you choose, if you don't provide a option or a method then it will remain the default ones. The options you can provide above can be found by the methods in other points of the documentaion

# Strip
`dash.strip(string, options)`
```js
const statement = 'Hello -ab world, I --c am -b a a test -d "h"!';

const parsed = dash.strip(statement, {
    removeWhitespace: true,
    removeFlags: true,
    removeArgs: true
});

console.log(parsed) // Hello I am a test!
```
`removeWhitespace`: Remove whitespaces<br>
`removeFlags`: If false then flags will be ignored<br>
`removeArgs`: If false then args will be ignored

# Methods on parsed args
There are a few methods that can be done on the result from `dash.parse()` (The DashArgs class)<br>
- ## Has
    `dash.parse(string, options).has(key)`
    ```js
    const statement = '-hello world';

    const parsed = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true
    });

    console.log(parsed.has('hello')) // true
    ```
    ```js
    // Check if it has any one of the supplied keys
    const statement = '-a b -c d';

        const parsed = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true
    });

    console.log(parsed.has('x', 'a')) // true
    ```
- ## Get
    `dash.parse(string, options).get(key)`
    ```js
    const statement = '-hello world';

    const parsed = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true
    });

    console.log(parsed.get('hello')) // world
    ```
- ## Array
    `dash.parse(string, options).array()`
    ```js
    const statement = '-hello world';

    const parsed = dash.strip(statement, {
        removeWhitespace: true,
        removeFlags: true,
        removeArgs: true
    });

    console.log(parsed.array()) // [{ key: 'hello', value: 'world', raw: '-hello world' }]
    ```

# FAQ
- ## Quote Escaping
    In arguments it's possible to escape quotes, for example `-a "b \" c"`. Due to JavaScript seeing the `\"` as escaped, dashargs doesn't see the `\` just `"` therefore you must escape the `\`, for example `-a "b \\" c"`

- ## Custom Prefixes
    Custom prefixes are possible with dashargs, on all methods, just pass in a prefix option with your desired prefix, however, you must be careful when doing this as certain prefixes such as `"` will not work correctly and create unexpected behaviors, therefore they are not recommened.

- ## Examples
    You are able to view examples in the examples directory of the project which can be found [here](https://github.com/ghoststools/dashargs/tree/master/examples)

- ## Other import methods
    You are able to use a es import for node such as:
    ```js
    import dash from 'dashargs';
    ```
    and for typescript:
    ```js
    import * as dash from 'dashargs';
    ```

- ## Support
    - Message me on discord: `GHOST#7524`<br>
    - Join the [discord](https://discord.gg/2Vd4wAjJnm)<br>
    - Create a issue on the [github](https://github.com/ghoststools/dashargs)