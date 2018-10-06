require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error")
const {loginRequired, ensureCorrectUser} = require("./middleware/auth")
const db = require("./models")

//Config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//requiring routes
const questionsRoutes = require("./routes/questions");
const indexRoutes     = require("./routes/index");
const otherRoutes     = require("./routes/other");
const itemRoutes      = require("./routes/items");
const authRoutes      = require("./routes/auth");

//Using Routes
app.use("/api", indexRoutes);
app.get("/api/questions", async function(req, res, next){
  try{
    let questions = await db.Question.find()
      .sort({createdAt:'desc'})
      .populate("author", {
        username: true
      })
    return res.status(200).json(questions)
  } catch(err){
    return next(err);
  }
})
app.use("/api/users/:id/questions",
  loginRequired,
  ensureCorrectUser,
  questionsRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/", otherRoutes);



app.use(function(req, res, next){
  let err = new Error("Not Found")
  err.status = 404;
  next(err)
})

app.use(errorHandler)

app.listen(port, function(){
  console.log("WePoll Server started!" + port);
});