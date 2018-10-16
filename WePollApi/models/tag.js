const mongoose = require("mongoose");

//Tag Schema Setup
const TagSchema = new mongoose.Schema({
    tag: String,
    questions: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }]
})

module.exports = mongoose.model("Tag", TagSchema);