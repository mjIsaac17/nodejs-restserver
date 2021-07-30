const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} does not exist`);
  }
};

const checkIfEmailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email ${email} already exists`);
  }
};

const checkIfUserIdExists = async (id) => {
  const idExists = await User.findById(id);
  if (!idExists) {
    throw new Error(`The user does not exists`);
  }
};

module.exports = {
  isRoleValid,
  checkIfEmailExists,
  checkIfUserIdExists,
};
