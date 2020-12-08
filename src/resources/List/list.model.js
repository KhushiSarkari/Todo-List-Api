const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({}, { timestamps: true });
const List = mongoose.Model('list', listSchema);

module.exports.List = List;
