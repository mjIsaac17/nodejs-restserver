const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verify if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid user or password (email)",
      });
    }

    // Check if user is active
    if (!user.active) {
      return res.status(400).json({
        msg: "Invalid user or password (inactive user)",
      });
    }

    // Verify the password
    //TODO: Validate password is valid(string, not number)
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Invalid user or password (password)",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
      //isEmailValid,
    });
  } catch (error) {
    //This would never happen but if there's an error with the server
    console.log(error);
    res.status(500).json({
      msg: "Contact IT for support",
    });
  }
};

module.exports = {
  login,
};
