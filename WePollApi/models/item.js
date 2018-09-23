const mongoose = require("mongoose");
// const defaultImage = require('../img/BackPack.jpg')

//Inventory Item (shop) Schema Setup
const ItemSchema = new mongoose.Schema({
    name:String,
    cost: {
            type:Number,
            default: 1
          },
    // image:{
    //         type:String,
    //         default: defaultImage
    //       },
    stack:{
            type:Number,
            default: 1
          }
});

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item;