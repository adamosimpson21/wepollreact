const mongoose = require("mongoose");

//Inventory Item (shop) Schema Setup
const ItemSchema = new mongoose.Schema({
    name:String,
    cost:Number,
    image:String,
    stack:Number
});

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item;