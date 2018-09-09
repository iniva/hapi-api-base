require('@babel/register');
require('@babel/polyfill');
if (process.env.NODE_ENV !== 'production') {
    // Load Environment Variables from .env file
    require('dotenv/config');
}
require('./src/index');
