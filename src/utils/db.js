const mongoose = require('mongoose');
const { dbUrl } = require('../config/dev');

module.exports.connect = (url = dbUrl, options = {}) => {
    mongoose.connect(url, { ...options, useNewUrlParser: true });
    mongoose.connection.once('open', _ => {
        console.log('Connection Established');
    }).on('error', _ => {
        console.log('Connection error');
        throw err;
    });
}