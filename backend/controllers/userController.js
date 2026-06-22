const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const user = await User.create({
      name: "Jitanshu",
      email: "jitanshu@example.com",
      password: "123456",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
};