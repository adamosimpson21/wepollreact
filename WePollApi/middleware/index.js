//MiddleWare Index
var Question = require("../models/question");
var middlewareObj={};
var mongoose = require("mongoose");
var express = require("express");


//Array Equals method
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

middlewareObj.createAnswer= function createAnswer2(answer, question){
    question.answers.push(answer);
    question.save();
}

middlewareObj.createQuestion = function createQuestion(req){
    var title = req.body.title;
    var description = req.body.description;
    var questionContent = req.body.questionContent;
    var education = req.body.education;
    var author = req.user._id;
    //variable Answer
    var numberOfAnswers = req.body.numberOfAnswers
    var answers = []
    for(var i=0; i<numberOfAnswers; i++){
        answers.push([req.body.answer[i],0])
    }
    var newQuestion = {
                        title, 
                        description, 
                        questionContent, 
                        education, 
                        author,
                        answers
                    }
    return newQuestion;
}

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Log In to do that");
    res.redirect("/login");
};



middlewareObj.logAnswer = function logAnswer(answer, question, user, req){
    var storedAnswer = [question._id,answer];
    //increment answer tally
    for(var i=0; i<question.answers.length; i++){
        if(question.answers[i][0]==(answer)){
            question.answers[i][1] =question.answers[i][1]+1;
            Question.findByIdAndUpdate(question._id, question, function(err, foundQuestion2){
                if(err){
                    console.log(err)
                }
            })
        }
    }
    if(question.xpReward){
        var userLevelBefore = middlewareObj.checkLevel(user.experience)
        user.experience += question.xpReward
        //Check for LevelUp
        var userLevelAfter = middlewareObj.checkLevel(user.experience)
        if(userLevelBefore!==userLevelAfter){
            req.flash("success", "You've level up to level " + userLevelAfter)
        }
    }
    user.questions.push(question._id);
    user.answers.push(storedAnswer);
    user.save();
}

//Checks to see if a user has Answered a Question
middlewareObj.hasAnswered = function hasAnswered(user, question){
    for(var i=0; i<user.questions.length; i++){
    //loops through IDs of question that user has answered, compares with current questionID
    if (user.questions[i].equals(question._id)){
        //returns true if user has answered question
        return true
    }
}
    //exits loops and returns false if user has no answered question
    return false
}

//returns amount of total experience to reach a level
middlewareObj.xpToLevel = function xpToLevel(level){
    if(level<=1){
        return 0;
    } else if (level<=2){
        return 100;
    } else if (level<=3){
        return 500;
    } else if (level<=4){
        return 1000;
    } else if (level<=5){
        return 1500;
    } else if (level<=6){
        return 2000;
    } else if (level<=7){
        return 2500;
    } else {
        return 3000;
    }
}


//checks the User's level based on experience
middlewareObj.checkLevel = function checkLevel(experience){
    for (var i=1; i<10; i++){
        //checks user's XP vs next level
        if(experience<middlewareObj.xpToLevel(i)){
            //returns level -1
            return i-1;
        }
    }
}


//returns the User's percent progress to the next level
middlewareObj.levelProgress = function levelProgress(experience){
    //progress this level
    var progress = (experience-middlewareObj.xpToLevel(middlewareObj.checkLevel(experience)))
    //experience for next level
    var nextLevel =(middlewareObj.xpToLevel(middlewareObj.checkLevel(experience) + 1)-(middlewareObj.xpToLevel(middlewareObj.checkLevel(experience))))
    //divide progress/next and return percentage
    return ((progress/nextLevel)*100)
}

module.exports = middlewareObj;