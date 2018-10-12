const express = require('express');
const router = express.Router();
const helpers = require('../helpers/user');
const { loginRequired, ensureCorrectUser } = require("../middleware/auth")

router.route("/:id/coins",
    loginRequired,
    ensureCorrectUser)
  .put(helpers.addCoins)

module.exports = router;