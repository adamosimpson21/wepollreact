var db = require('../models');

function userHasItem(user, item){
  return user.inventory.includes(item._id)
}

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

exports.addItem = async function(req, res, next){
  try {
    let user = await db.User.findById(req.params.id)
    user.inventory.push(req.params.item_id);
    await user.save();
    return res.status(200).json(user)
  } catch(err){
    return next(err)
  }
}

exports.removeItem = async function(req, res, next){
  try{
    let user = await db.User.findById(req.params.id)
    let index = user.inventory.indexOf(req.params.item_id)
    user.inventory.splice(index, 1)
    await user.save();
    return res.status(200).json(user)
  } catch(err){
    return next(err)
  }
}

module.exports = exports