const db = require('../models');

exports.getItems = function(req, res){
  db.Item.find()
    .then(items => {
      res.json(items)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.createItem = function(req, res){
  db.Item.create(req.body)
    .then(newItem => {
      res.status(201).json(newItem);
    })
    .catch(err => {
      res.send(err);
    })
}

exports.getItem = function(req, res){
  db.Item.findById(req.params.itemId)
    .then(foundItem => {
      res.json(foundItem)
    })
    .catch(err => {
      res.send(err);
    })
}

exports.updateItem = function(req, res){
  db.Item.findOneAndUpdate({_id:req.params.itemId}, req.body, {new: true})
    .then(item => {
      res.json(item)
    })
    .catch(err => {
      res.send(err);
    })
}

exports.deleteItem = function(req, res){
  db.Item.remove({_id:req.params.itemId})
    .then(() => {
      res.json({message:"Deleted Item"})
    })
    .catch(err => {
      res.send(err);
    })
}

module.exports = exports;