const db = require("../models")

// TODO: break this out into smaller functions, refactor
exports.answerQuestion = async function(req, res){
  try{
    console.log("Got to answer Question route")
    const answer = req.body.answer
    let question = await db.Question.findById(req.params.question_id)
    let user = await db.Question.findById(req.params.id)
    console.log("Question is: ", question, "User is: ", user)
    if(!question.answers.includes(answer)){
      console.log("Could not find answer in question: ", question.answers, "answer: ", answer)
      return next({
        status: 403,
        message: "That Answer does not exist"
      })
    }
    let result = await db.Result.create({question:question._id, user:user._id, answer})
    console.log("result is: ", result)
    question.result.push(result._id)
    user.results.push(result._id)
    if(question.xpReward && Number.isInteger(question.xpReward)){
      user.experience += question.xpReward
    }
    await question.save()
    await user.save()
    return res.status(200).json(result)
  } catch(err){
    return(next(err))
  }
}

// TODO: implement this after we work on the Specifications
exports.updateResult = function(req, res){
  return(next());
}

module.exports = exports;