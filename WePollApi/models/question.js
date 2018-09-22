var mongoose = require("mongoose");

//Schema Setup
var questionSchema = new mongoose.Schema({
    title: String,
    questionContent: String,
    rating: { 
                type:Number,
                default: 1
            },
    author:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
    description: String,
    xpReward: { 
                type:Number,
                default: 150
            },
    education: String,
    tags: [],
    answers: [],
    createdAt:{
                type:Date,
                default:Date.now
            }
})

module.exports = mongoose.model("Question", questionSchema);