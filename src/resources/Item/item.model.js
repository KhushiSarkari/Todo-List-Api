const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({}, { timestamps: true });
const Item = mongoose.Model('item', itemSchema);

module.exports = Item;