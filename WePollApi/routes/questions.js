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

//Questions Show Route
// router.get("/:id", middleware.isLoggedIn, function(req, res){
//     Question.findById(req.params.id).populate("author").exec(function(err, foundQuestion){
//         if(err){
//             console.log(err)
//             req.flash("error", err.message);
//         } else {
//             //check to see if User has answered question
//             if(middleware.hasAnswered(req.user, foundQuestion)){
//                 req.flash("error", "You've answered this question already");
//                 res.redirect(`/questions/${req.params.id}/results`);
//             } else{
//                 res.render("questions/show", {question:foundQuestion})
//             }
//         }
//     });
// });
//
// //Question Education get route
// router.get("/:id/education", middleware.isLoggedIn, function(req, res){
//     Question.findById(req.params.id).populate("author").exec(function(err, foundQuestion){
//         if(err){
//             console.log(err);
//         } else {
//                res.render("questions/education", {question:foundQuestion})
//         }
//     });
// });
//
// // Answer Q post route
// router.post("/:id", middleware.isLoggedIn, function(req, res){
//     Question.findById(req.params.id).populate("author").exec(function(err, foundQuestion){
//         if(err){
//             console.log(err.message);
//             res.redirect(`/questions/${req.params.id}`);
//         } else {
//             var newAnswer=req.body.answerChoice;
//             middleware.logAnswer(newAnswer, foundQuestion, req.user, req)
//             res.redirect(`/questions/${req.params.id}/results`);
//         }
//     })
// })
//
// //Question Results Route
// router.get("/:id/results", middleware.isLoggedIn, function(req, res){
//     Question.findById(req.params.id).populate("author").exec(function(err, foundQuestion){
//         if(err){
//             console.log(err);
//             res.redirect("/questions")
//         } else {
//             // psuedocode for sending User demographic info into results page
//
//             // User.find({questions: foundQuestion._id }).exec(function(err, foundUsers){
//             //     if(err){
//             //         console.log(err);
//             //         req.flash("error", `Error finding Users: ${err.message}`);
//             //         res.render("questions/results", {question:foundQuestion})
//             //     } else {
//             //         console.log(`foundUsers.length is ${foundUsers.length}`)
//                     // res.render("questions/results", {question:foundQuestion}, {users:foundUsers});
//                     res.render("questions/results", {question:foundQuestion});
//                 // }
//             }
//         }
//     )
// })
//
// //Question Edit Route
// router.get("/:id/edit", function(req, res){
//     Question.findById(req.params.id, function(err, foundQuestion){
//         if(err){
//             console.log(err);
//             res.redirect("/questions");
//         } else {
//             res.render("questions/edit", {question:foundQuestion});
//         }
//     });
// });
//
// //Question Update Route
// router.put("/:id", function(req, res){
//     //find and update the correct question
//     Question.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             req.flash("error", `Question not deleted: ${err.message}`);
//             res.redirect("/questions");
//         } else {
//             var newQuestion = middleware.createQuestion(req);
//             //create a new question and save to DB
//             Question.create(newQuestion, function(err, questionVar){
//                 if (err){
//                     console.log(err)
//                     req.flash("error", err.message);
//                 } else {
//                     req.flash("success", "Question updated successfully");
//                 }
//             })
//             res.redirect("/questions");
//         }
//     })
// });
//
// //Question Delete Route
// router.delete("/:id", function(req, res){
//     Question.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             req.flash("error", `Question not deleted: ${err.message}`);
//             res.redirect("/questions");
//         } else {
//             req.flash("success", "Question deleted!");
//             res.redirect("/questions");
//         }
//     });
// });

module.exports = router;