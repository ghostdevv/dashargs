const configManager = require('./config.js');
const DashArgs = require('./dashargs.js');

module.exports = (string = '', options = {}) => {

    if ((typeof string != 'string')) throw new TypeError('ERR: dashargs#parse - given args must be a string');
    if ((typeof options != 'object')) throw new TypeError('ERR: dashargs#parse - given options must be an object')

    options = configManager.merge(options);
    
    return new DashArgs(string, options)

};