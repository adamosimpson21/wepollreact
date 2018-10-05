const express = require("express");
const router = express.Router();

//Handle LogIn form Logic
// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect:"/questions",
//         failureRedirect:"/login",
//         successFlash: "Welcome to WePoll",
//         failureFlash: true
//     }));

//Log Out Route
// router.get("/logout", function(req, res){
//     req.logout();
//     req.flash("success", "You have successfully Logged out!")
//     res.redirect("/");
// });



module.exports = router;
