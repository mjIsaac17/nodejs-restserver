const { Router } = require("express");
const { check } = require("express-validator");

const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/user.controller");
const { isRoleValid } = require("../helpers/db-validators");
const { validateUser } = require("../middlewares/validateUser");
const router = Router();

router.get("/", userGet);

router.put("/:id", userPut);

//check is a middleware
router.post(
  "/",
  [
    check("name", "The name is required").notEmpty(),
    check(
      "password",
      "The password must contain at least 5 characters"
    ).isLength({ min: 5 }),
    check("email", "The email entered is not valid").isEmail(), //check a params from the body
    check("role").custom(isRoleValid), //the line below is the same
    //check("role").custom((role) => isRoleValid(role)),
    // check("role", "Invalid rol").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateUser,
  ],
  userPost
);

router.delete("/", userDelete);

module.exports = router;
