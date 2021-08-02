const { Category, Product } = require("../models");
const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} does not exist`);
  }
};

const checkIfEmailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email ${email} already exists`);
  }
};

const checkIfUserIdExists = async (id) => {
  const idExists = await User.findById(id);
  if (!idExists) {
    throw new Error(`The user does not exists`);
  }
};

const checkIfCategoryNameExists = async (name, { req }) => {
  const categoryName = name.toUpperCase();
  const nameExists = await Category.findOne({ name: categoryName });
  if (nameExists && req.params.id != nameExists.id) {
    throw new Error(`The category ${categoryName} already exists`);
  }
};

const checkIfCategoryIdExists = async (id) => {
  const idExists = await Category.findById(id);
  if (!idExists) {
    throw new Error(`The category id ${id} does not exists`);
  }
};

const checkIfProductNameExists = async (name, { req }) => {
  const productName = name.toUpperCase();
  const nameExists = await Product.findOne({ name: productName });
  if (nameExists && req.params.id != nameExists.id) {
    throw new Error(`The product ${productName} already exists`);
  }
};

const checkIfProductIdExists = async (id) => {
  const idExists = await Product.findById(id);
  if (!idExists) {
    throw new Error(`The product id ${id} does not exists`);
  }
};

module.exports = {
  isRoleValid,
  checkIfEmailExists,
  checkIfUserIdExists,
  checkIfCategoryNameExists,
  checkIfCategoryIdExists,
  checkIfProductNameExists,
  checkIfProductIdExists,
};
