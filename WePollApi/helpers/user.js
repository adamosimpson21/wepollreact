var db = require('../models');

exports.addCoins = function(req, res){
  db.User.findById(req.params.id)
    .then(foundUser => {
      // TODO:this needs error handling and tests
      foundUser.coins += parseInt(req.body.coins);
      foundUser.save();
      res.json(foundUser);
    })
    .catch(err => {
      res.send(err);
    })
}

module.exports = exports