var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var bodyParser = require("body-parser");

//Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




//requiring routes
var questionsRoutes = require("./routes/questions");
var indexRoutes     = require("./routes/index");
var otherRoutes     = require("./routes/other");
var itemRoutes      = require("./routes/items");

//Using Routes
app.use("/api", indexRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/", otherRoutes);
app.use("/api/items", itemRoutes);


app.get('/', function(req, res){
  res.send("Hi from express!!");
})

app.listen(port, function(){
  console.log("WePoll Server started!" + port);
});