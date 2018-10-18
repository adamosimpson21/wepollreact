const db = require("../models")

exports.createQuestion = async function(req, res, next){
  try{
    console.log("in create question. req.body is: ", req.body)
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
    let question = await db.Question.findById(req.params.question_id).populate('results').populate('author', {username:true})
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

exports.answerQuestion = async function(req, res, next){
  try{
    // TODO: There are a lot more things to include here. Not finished at all
    let question = await db.Question.findById(req.params.question_id)
    let user = await db.User.findById(req.params.id)
    let result = await db.Result.create({question:question._id, user:user._id, answer:req.body.answer})
    Number.isInteger(question.xpReward) ? user.experience += question.xpReward : null
    user.results.push(result)
    user.questions.push(question._id)
    question.results.push(result._id)
    await user.save();
    await question.save();
    return res.status(200).json(result);
  } catch(err){
    return next(err);
  }
}

module.exports = exports;