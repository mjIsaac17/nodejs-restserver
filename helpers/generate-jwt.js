const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  // The package 'jsonwebtoken' works with Promises,
  // so we need to create a Promise
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "3h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error when generating the token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
