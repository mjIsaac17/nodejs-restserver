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

const search = (req, res = response) => {
  const { collection, term } = req.params;
  console.log(collection, term);
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
      break;
    case "products":
      break;
  }
};

module.exports = {
  search,
};
