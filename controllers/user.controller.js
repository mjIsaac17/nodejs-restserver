const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const userGet = (req = request, res = response) => {
  const { q, name = "No name" } = req.query; //get query params
  //res = response to have the autocomplete methods
  res.json({
    msg: "get API - controller",
    q,
    name,
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - controller",
    id,
  });
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Verify if email exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({
      msg: "The email entered already exists",
    });
  }

  //Encrypt password by using hash (one way/ una via)
  const salt = bcryptjs.genSaltSync(); //10 spins is the default value
  user.password = bcryptjs.hashSync(password, salt);

  //Save in DB
  await user.save();
  //const { name, age } = req.body;

  res.json({
    user,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
