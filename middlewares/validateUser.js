const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next(); //this function is used in middlewares to know if we pass the validation
  // it continues with the next middleware and then the controller
};

module.exports = {
  validateFields,
};
