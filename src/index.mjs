import config from './options/Options.js';
import parse from './methods/parse.js';
import strip from './methods/strip.js';
import argv from './methods/argv.js';

/**
 * DashArgs
 * @module dashargs
 */
export default {
    parse,
    config: config.defaults,
    strip,
    argv,
};
