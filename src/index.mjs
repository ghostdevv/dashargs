import config from './options/Options.js';
import parse from './methods/parse.js';
import strip from './methods/strip.js';

export default {
    parse,
    config: config.defaults,
    strip,
};
