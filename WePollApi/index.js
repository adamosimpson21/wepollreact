require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error")

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
app.use("/api/questions", questionsRoutes);
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