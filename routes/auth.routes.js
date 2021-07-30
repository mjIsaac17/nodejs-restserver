const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");

const { validateUserFields } = require("../middlewares/validateUser");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").notEmpty(),
    validateUserFields,
  ],
  login
);

module.exports = router;
