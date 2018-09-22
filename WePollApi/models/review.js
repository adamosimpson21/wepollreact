var mongoose = require("mongoose");

//Tag Schema Setup
var ReviewSchema = new mongoose.Schema({
    review: Number,
    question: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }],
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Review", ReviewSchema);