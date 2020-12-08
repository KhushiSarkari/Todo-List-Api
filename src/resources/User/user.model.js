const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({}, { timestamps: true });
const User = mongoose.Model('user', userSchema);

module.exports = User;