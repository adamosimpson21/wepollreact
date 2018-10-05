const mongoose = require("mongoose");
const User = require("./user")

//Schema Setup
const questionSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  questionContent: {
    type:String,
    required:true
  },
  rating: {
    type:Number,
    default: 1
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: {
    type:String,
    required:true
  },
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

questionSchema.pre("remove", async function(next){
  try{
    let user = await User.findById(this.userId);
    user.message.remove(this.id);
    await user.save()
    return next();
  } catch(err){
    return next(err);
  }
})

module.exports = mongoose.model("Question", questionSchema);