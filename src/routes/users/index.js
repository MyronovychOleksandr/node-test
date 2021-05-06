const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/usersControllers");
const guard = require("../../helpers/guard");
const { createAccountLimiter } = require("../../helpers/rate-limit");

router
  .post("/register", createAccountLimiter, userControllers.register)
  .post("/login", userControllers.login)
  .post("/logout", guard, userControllers.logout);

module.exports = router;
