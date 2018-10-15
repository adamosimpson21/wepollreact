const express = require('express');
const router = express.Router();
const helpers = require('../helpers/items');
const { loginRequired, ensureCorrectUser, adminOnly } = require('../middleware/auth')

router.route('/')
  .get(helpers.getItems)

router.route('/:id')
  .all(loginRequired, ensureCorrectUser, adminOnly)
  .post(helpers.createItem)

router.route('/:id/:itemId')
  .get(helpers.getItem)
  .put(helpers.updateItem)
  .delete(helpers.deleteItem)

module.exports = router;