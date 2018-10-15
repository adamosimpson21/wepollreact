const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },
  answer:{
    type:String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{
  timestamps:true
})

const Result = mongoose.model("Result", ResultSchema)

module.exports = Result;