const db = require("../models")

exports.createQuestion = async function(req, res, next){
  try{
    const { title, questionContent, description, education, tags, answers } = req.body
    let question = await db.Question.create({
      title,
      education,
      tags,
      questionContent,
      description,
      answers,
      author:req.params.id
    })
    let foundUser = await db.User.findById(req.params.id)
    foundUser.authored.push(question.id);
    await foundUser.save()
    let foundQuestion = await db.Question.findById(question._id)
      .populate("user", {
        username: true
      })
    return res.status(200).json(foundQuestion);
  } catch(err){
    return next(err);
  }
}

exports.getQuestion = async function(req, res, next){
  try{
    let question = await db.Question.findById(req.params.question_id)
    return res.status(200).json(question)
  } catch(err){
    return next(err);
  }
}

exports.getAllQuestions = async function(req, res, next){
  try{
    let questions = await db.Question.find({})
    return res.status(200).json(questions)
  } catch(err){
    return next(err);
  }
}

exports.updateQuestion = async function(req, res, next){
  try{
    let question = await db.Question.findById(req.params.iq)
    console.log("not implemented yet: ", question)
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

module.exports = exports;