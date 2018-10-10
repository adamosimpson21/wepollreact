const { loginRequired } = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { signup, signin, hydrate } = require("../handlers/auth")

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/hydrate",
  loginRequired,
  hydrate)

module.exports = router;