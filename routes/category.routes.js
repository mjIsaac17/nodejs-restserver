const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { checkIfCategoryNameExists } = require("../helpers/db-validators");
const { validateJWT, isRoleAdmin } = require("../middlewares");

const { validateFields } = require("../middlewares/validateUser");

const router = Router();
/**
 * {{url}}/api/categories
 */

//Get all categories - public
router.get("/", getCategories);

//Get category by Id - public
// add categoryExists method in db-valitations file
router.get(
  "/:id",
  [check("id", "Invalid category id").isMongoId(), validateFields],
  getCategory
);

//Create category - private - any role with a valid token
router.post(
  "/",
  [
    validateJWT,
    check("name", "A category name is required").notEmpty(),
    validateFields,
  ],
  createCategory
);

//Update category by id - private - any role with a valid token
router.put(
  "/:id",
  [
    validateJWT,
    check("name").custom(checkIfCategoryNameExists),
    validateFields,
    check("id", "Invalid category id").isMongoId(),
    validateFields,
  ],
  updateCategory
);

//Delete category - USER_ADMIN
router.delete(
  "/:id",
  [validateJWT, isRoleAdmin, check("id", "Invalid category id").isMongoId()],
  deleteCategory
);
module.exports = router;
