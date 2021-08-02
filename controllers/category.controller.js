const { response } = require("express");
const { Category } = require("../models");

// getCategories - paginate - total - populate (to get all user details)

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const condition = { active: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(condition), //get total of categories
    Category.find(condition).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    categories,
  });
};

// getCategory - populate {}
const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user"); //populate("user", "name") "name" -> is the field(s) to display
  if (!category) {
    return res.status(401).json({ msg: `Category id ${id} not found` });
  }

  res.json({
    category,
  });
};

const createCategory = async (req, res = response) => {
  //We are going to store the names in upper case to avoid duplicate categories
  const name = req.body.name.toUpperCase();

  //   const isCategoryUnique = await Category.findOne({ name });
  //   if (isCategoryUnique) {
  //     return res.status(400).json({
  //       msg: `The category ${name} already exists`,
  //     });
  //   }

  //Generate data to save
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json(category);
};

// updateCategory (name)
const updateCategory = async (req, res = response) => {
  const newCategoryName = req.body.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: newCategoryName,
      user: req.user.id,
    },
    { new: true } //this is to get the updated object in the response
  );
  res.json(category);
};

// deleteCategory -> state = false
const deleteCategory = async (req, res = response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, {
    active: false,
  });
  if (!category) {
    return res.status(401).json({
      msg: "Category not found",
    });
  }
  res.json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
