const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term); //true
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i"); // i = no key sensitive (insensitive)

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ active: true }],
  });
  res.json({ results: users });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term); //true
  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i"); // i = no key sensitive (insensitive)

  const categories = await Category.find({
    name: regex,
    active: true,
    // $or: [{ name: regex }],
    // $and: [{ active: true }],
  });
  res.json({ results: categories });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term); //true
  if (isMongoId) {
    const product = await Product.findById(term);
    return res.json({
      results: product ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i"); // i = no key sensitive (insensitive)
  if (!isNaN(term)) {
    const products = await Product.find({
      price: { $gte: term },
      active: true,
    }); //$gte find like by number
    return res.json({ results: products });
  }
  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ active: true }],
  });

  res.json({ results: products });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;
  if (!allowedCollections.includes(collection)) {
    return res.status(404).json({
      msg: `The allowed collections are ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
  }
};

module.exports = {
  search,
};
