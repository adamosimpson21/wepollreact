const mongoose = require("mongoose");

//Party Schema
const partySchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    unique: true
  },
  president:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  description: String,
  image: String,
  level: Number,
  partyLine:[]
});

module.exports = mongoose.model("Party", partySchema)