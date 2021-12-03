import configW from './options/Options.js';
import parse from './methods/parse.js';
import strip from './methods/strip.js';
import argv from './methods/argv.js';

const config = configW.defaults;

export {
    parse,
    strip,
    argv,
    config
}

/**
 * DashArgs
 * @module dashargs
 */
export default {
    parse,
    config,
    strip,
    argv,
};
