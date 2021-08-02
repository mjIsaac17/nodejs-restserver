const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  //const { q, name = "No name" } = req.query; //get query params
  //res = response to have the autocomplete methods
  const { limit = 5, from = 0 } = req.query;
  const condition = { active: true };
  //   //Validate that limit and from are numbers
  //   const users = await User.find({ active: true }) //condition
  //     .skip(Number(from))
  //     .limit(Number(limit));
  //   const total = await User.countDocuments({ active: true });

  //Array desctructuring
  //const result = await Promise.all([
  const [total, users] = await Promise.all([
    User.countDocuments(condition),
    User.find(condition).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    //result,
    total,
    users,
  });
};

const userPut = async (req, res = response) => {
  //Extract the data that we don't want to update
  const { _id, password, google, email, ...userData } = req.body;

  //Validate in the database
  if (password) {
    //Encrypt password by using hash (one way/ una via)
    const salt = bcryptjs.genSaltSync(); //10 spins is the default value
    userData.password = bcryptjs.hashSync(password, salt);
  }

  //Here we have the user updated
  const user = await User.findByIdAndUpdate(_id, userData);

  res.json(user);
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

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

const userDelete = async (req, res = response) => {
  const { id } = req.params;
  //TODO: validate that deleted user (logic delete) exists
  //Logic delete
  const user = await User.findByIdAndUpdate(id, { active: false }); //we are setting 'active'= false
  const authUser = req.user;
  //Fisic delete
  //const user = await User.findByIdAndDelete(id);
  res.json({
    user,
    authUser,
  });
};
module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
