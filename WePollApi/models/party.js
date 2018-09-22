var mongoose = require("mongoose");


//Party Schema
var partySchema = new mongoose.Schema({
    name: String,
    president:{
        // id: {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"User"
        // },
        // username:String
    },
    description: String,
    image: String,
    level: Number,
    partyLine:[]
});

module.exports = mongoose.model("Party", partySchema)