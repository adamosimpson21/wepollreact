const db = require("../models")

exports.createQuestion = async function(req, res, next){
  try{
    let message = await db.Question.create({
      title:req.body.title,
      questionContent: req.body.questionContent,
      description: req.body.description,
      author:req.params.id
    })
    let foundUser = await db.User.findById(req.params.id)
    foundUser.questions.push(message.id);
    await foundUser.save()
    let foundQuestion = await db.Question.findById(message._id)
      .populate("user", {
        username: true
      })
    return res.status(200).json(foundQuestion);
  } catch(err){
    return next(err);
  }
}

// GET /api/users/:id/questions/:message_id
exports.getQuestion = async function(req, res, next){
  try{
    let question = await db.Question.find(req.params.question_id)
    return res.status(200).json(question)
  } catch(err){
    return next(err);
  }
}

exports.deleteQuestion = async function(req, res, next){
  try{
    let foundQuestion = await db.Question.findById(req.params.question_id)
    await foundQuestion.remove();
    return res.status(200).json(foundQuestion)
  } catch(err){
    return next(err);
  }
}