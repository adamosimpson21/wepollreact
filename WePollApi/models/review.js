const mongoose = require("mongoose");

// Numerical Review on a Question
const ReviewSchema = new mongoose.Schema({
  review: Number,
  question: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Question"
  },
  author: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

module.exports = mongoose.model("Review", ReviewSchema);