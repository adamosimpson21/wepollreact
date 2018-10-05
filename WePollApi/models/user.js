const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User Schema Setup
const UserSchema = new mongoose.Schema({
  username:
    {
      type: String,
      required: true,
      unique: true
    },
  password:
    {
      type:String,
      required:true
    },
  image: String,
  settings: [],
  party:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Party"
    },
  questions:
    [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
      }
    ],
  answers:[],
  coins:
    {
      type:Number,
      default: 5
    },
  experience:
    {
      type:Number,
      default: 0
    },
  inventory:
    [
      {
       type:mongoose.Schema.Types.ObjectId,
       ref: "Item"
      }
    ],
  avatar:
    {
      type:String,
      default: "https://freeclipartimage.com//storage/upload/human-clipart/human-clipart-15.png"
    },
  createdAt:
    {
      type:Date,
      default:Date.now
    },
  age:
    {
      type:Number,
      default: 1
    },
  race:
    {
      type:String, enum: ['White', 'Black', 'Native American', 'Hispanic', 'Other', 'Not Specified'],
      default: 'Not Specified'
    },
  income:
    {
      type:Number,
      default: 0
    },
  gender:
    {
      type:String, enum: ['Male', 'Female', 'Other', 'Choose not to say', 'Not Specified'],
      default: 'Not Specified'
    },
  education:
    {
      type:String, enum: ['Masters', 'Bachelors', 'High School', 'Less than High School', 'Not Specified'],
      default: 'Not Specified'
    },
  location: String,
  familySize:
    {
      type:Number,
      default: 0
    }
})

UserSchema.pre("save", async function(next){
  try{
    if(!this.isModified("password")){
      return next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next()
  } catch(err){
    return next(err);
  }
})

UserSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch(err){
    return next(err);
  }
}

const User = mongoose.model("User", UserSchema)

module.exports = User;