const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/items')

router.route('/')
  .get(helpers.getItems)
  .post(helpers.createItem)

router.route('/:itemId')
  .get(helpers.getItem)
  .put(helpers.updateItem)
  .delete(helpers.deleteItem)

module.exports = router;