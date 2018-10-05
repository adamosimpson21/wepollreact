const express = require('express')
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error")
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

//Config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('express-session')({
  secret: 'Apple Pie High Five',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//requiring routes
const questionsRoutes = require("./routes/questions");
const indexRoutes     = require("./routes/index");
const otherRoutes     = require("./routes/other");
const itemRoutes      = require("./routes/items");

//Using Routes
app.use("/api", indexRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/", otherRoutes);
app.use("/api/items", itemRoutes);

// passport config
const Account = require('./models/user');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());




app.use(function(req, res, next){
  let err = new Error("Not Found")
  err.status = 404;
  next(err)
})

app.use(errorHandler)

app.listen(port, function(){
  console.log("WePoll Server started!" + port);
});