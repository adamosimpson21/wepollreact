const db = require('../models');

function userHasItem(user, item){
  let userHas = false;
  user.inventory.forEach(inventoryItem => {
    if(inventoryItem.equals(item._id)){
      userHas = true;
    }
  })
  return userHas
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
    const { id, item_id } = req.params
    let user = await db.User.findById(id)
    let item = await db.Item.findById(item_id)
    if(!item.canHaveMultiple && userHasItem(user, item)){
      return next({
        status: 403,
        message: "You already have that!"
      })
    }
    if(item.cost){
      if(item.cost>user.coins){
        return next({
          status: 403,
          message: "Not enough Coins"
        })
      } else {
        user.coins -= item.cost
      }
    }
    user.inventory.push(item_id);
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

exports.authLevel = async function(req,res, next){
  try{
    let user = await db.User.findByIdAndUpdate(req.params.id, {authLevel: req.body.authLevel})
    return res.status(200).json(user)
  } catch (err){
    return next(err)
  }
}

module.exports = exports