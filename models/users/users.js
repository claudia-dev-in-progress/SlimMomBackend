const User = require("./schema");

const getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

const getUserById = async (userId) => {
  return User.findOne({ _id: userId }, { email: 1 });
};

const addUser = async ({ email, password }) => {
  return User.create({ email, password });
};

const updateUser = async (userId, user) => {
  return User.findByIdAndUpdate({ _id: userId }, user, { new: true });
};

module.exports = {
  getUserByEmail,
  getUserById,
  addUser,
  updateUser,
};
