const express = require("express");
const router = express.Router({mergeParams:true});
const { loginRequired, ensureCorrectUser } = require('../middleware/auth')
const { createQuestion,
        getQuestion,
        deleteQuestion,
        getAllQuestions,
        updateQuestion} = require("../handlers/questions")

router.route("/")
  .get(getAllQuestions)

router.route("/:id")
  .all(loginRequired, ensureCorrectUser)
  .post(createQuestion)

router.route("/:id/:question_id")
  .get(getQuestion)
  .put(loginRequired,
    ensureCorrectUser,
    updateQuestion)
  .delete(ensureCorrectUser,
    loginRequired,
    deleteQuestion)

module.exports = router;