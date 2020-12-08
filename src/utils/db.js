const mongoose = require('mongoose');
const Config = require('../config/dev');

module.exports.connect = (url = Config.dbUrl, options = {}) => {
    mongoose.connect(url, { ...options, useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.connection.once('open', _ => {
        console.log('Connection Established');
    }).on('error', _ => {
        console.log('Connection error');
        throw err;
    });
}