/*
    This example allows you to provide --dev to set PRODUCTION environment variable as false
*/

const dash = require('dashargs');

const { dev } = dash.argv();

process.env.PRODUCTION = !dev;
