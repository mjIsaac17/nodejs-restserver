const { Router } = require("express");
const { check } = require("express-validator");
const {
  saveProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {
  checkIfCategoryIdExists,
  checkIfProductNameExists,
  checkIfProductIdExists,
} = require("../helpers/db-validators");

const { validateJWT, isRoleAdmin } = require("../middlewares");

const { validateFields } = require("../middlewares/validateUser");
const { validate } = require("../models/category.model");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [check("id", "Invalid product id").isMongoId(), validateFields],
  getProduct
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "A product name is required").notEmpty(),
    validateFields,
    check("categoryId", "Invalid category id").isMongoId(),
    check("name").custom(checkIfProductNameExists),
    validateFields,
    check("categoryId").custom(checkIfCategoryIdExists),
    validateFields,
  ],
  saveProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    isRoleAdmin,
    check("id", "Invalid product id").isMongoId(),
    validateFields,
    check("id").custom(checkIfProductIdExists), // we could check this until updating the records
    validateFields,
    check("categoryId").custom(checkIfCategoryIdExists),
    validateFields,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isRoleAdmin,
    check("id", "Invalid Product Id").isMongoId(),
    validateFields,
    check("id").custom(checkIfProductIdExists),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
