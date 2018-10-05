const db = require("../models")

exports.createQuestion = async function(req, res, next){
  try{
    let message = await db.Message.create({
      text:req.body.text,
      user:req.params.id
    })
    let foundUser = await db.User.findById(rq.params.id)
    foundUser.questions.push(message.id);
    await foundUser.save()
    let foundQuestion = db.Question.findById(message._id).populate("user", {
      username: true
    })
    return res.status(200).json(foundQuestion);
  } catch(err){
    return next(err);
  }
}

exports.getQuestion = async function(req, res, next){}

exports.deleteQuestion = async function(req, res, next){}