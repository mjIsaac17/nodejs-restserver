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
// const { validateFields } = require("../middlewares/validateUser");

const {
  validateJWT,
  validateFields,
  isRoleAdmin,
  userInRole,
} = require("../middlewares"); // this takes index.js as default

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    validateFields,
    check("id").custom(checkIfUserIdExists),
    validateFields,
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
    validateFields,
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
    validateFields,
    check("id").custom(checkIfUserIdExists),
    validateFields,
  ],
  userDelete
);

module.exports = router;
