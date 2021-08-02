const { response } = require("express");
const { Product } = require("../models");

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const condition = { active: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(condition), //get total of categories
    Product.find(condition)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("categoryId", "name")
      .populate("userId", ["name", "email"]),
  ]);
  res.json({
    total,
    products,
  });
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate(["userId", "categoryId"]); //populate("user", "name") "name" -> is the field(s) to display
  if (!product) {
    return res.status(404).json({ msg: `Product id ${id} was not found` });
  }

  res.json({
    product,
  });
};

const saveProduct = async (req, res = response) => {
  const { name, active, ...data } = req.body;
  //Generate data to save
  let productData = data;

  productData.name = req.body.name.toUpperCase();
  productData.userId = req.user._id;
  // productData.splice(data);
  console.log(productData);

  const product = new Product(productData);

  await product.save();

  res.status(201).json(product);
};

// updateCategory (name)
const updateProduct = async (req, res = response) => {
  //const { name, user, ...data } = req.body;

  const productData = req.body;
  productData.name = productData.name.toUpperCase();
  productData.user = req.user.id;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    productData,
    { new: true } //this is to get the updated object in the response
  );
  res.json(product);
};

// deleteCategory -> state = false
const deleteProduct = async (req, res = response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    active: false,
  }, {new: true});
  if (!product) {
    return res.status(401).json({
      msg: "Product not found",
    });
  }
  res.json(product);
};

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
};
