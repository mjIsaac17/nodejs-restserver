const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-role");
const validateUser = require("../middlewares/validateUser");

module.exports = {
  ...validateJWT, //... this is to include all methods when exporting
  ...validateRoles,
  ...validateUser,
};
