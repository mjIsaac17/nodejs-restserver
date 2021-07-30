const { response } = require("express");

const isRoleAdmin = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Trying to verify the user role without having a token",
    });
  }

  const { name, role } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `User '${name}' has no permissions to do this action`,
    });
  }
  next();
};

const userInRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Trying to verify the user role without having a token",
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: "You do not have access to this resource",
      });
    }

    next();
  };
};

module.exports = {
  isRoleAdmin,
  userInRole,
};
