const { Router } = require("express");
const { check } = require("express-validator");

const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/user.controller");
const {
  isRoleValid,
  checkIfEmailExists,
  checkIfUserIdExists,
} = require("../helpers/db-validators");
// const { validateJWT } = require("../middlewares/validate-jwt");
// const { isRoleAdmin, userInRole } = require("../middlewares/validate-role");
// const { validateUserFields } = require("../middlewares/validateUser");

const {
  validateJWT,
  validateUserFields,
  isRoleAdmin,
  userInRole,
} = require("../middlewares"); // this takes index.js as default

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    validateUserFields,
    check("id").custom(checkIfUserIdExists),
    validateUserFields,
  ],
  userPut
);

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
    check("email").custom(checkIfEmailExists),
    check("role").custom(isRoleValid), //the line below is the same
    //check("role").custom((role) => isRoleValid(role)),
    // check("role", "Invalid rol").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateUserFields,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    // isRoleAdmin,
    userInRole("USER_ROLE", "ADMIN_ROLE"),
    check("id", "Invalid id").isMongoId(),
    validateUserFields,
    check("id").custom(checkIfUserIdExists),
    validateUserFields,
  ],
  userDelete
);

module.exports = router;
