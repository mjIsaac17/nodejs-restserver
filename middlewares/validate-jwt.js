const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("my-token");
  if (!token) {
    //401 unauthorized
    return res.status(401).json({
      msg: "There's no token in the request",
    });
  }

  try {
    //   const paylaod = jwt.verify()...
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    // Get authenticated user
    const user = await User.findById(uid);
    if (!user) {
      //We should use return if we set the headers again, if the headers are overwritten, this causes an error
      return res.status(404).json({
        msg: "User not found in the database",
      });
    }
    //Verify if auth user is active
    if (!user.active) {
      return res.status(401).json({
        msg: "Invalid token. Inactive user",
      });
    }
    req.user = user;
    // req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
