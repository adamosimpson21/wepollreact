const mongoose = require("mongoose");

//Inventory Item (shop) Schema Setup
const ItemSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  cost: {
    type:Number,
    default: 1
  },
  image:{
    type:String,
    default: "https://images.unsplash.com/photo-1520946708818-4966701c25e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ada9b03ec040b816c353056c77eb6cd3&auto=format&fit=crop&w=1350&q=80"
  },
  stack:{
    type:Number,
    default: 1
  },
  canHaveMultiple:{
    type:Boolean,
    default: false
  }
});

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item;