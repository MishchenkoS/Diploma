const { User } = require('../models/userModel');

module.exports.getUserByLogin = async (login) => {
  const user = await User.findOne({login})
    .catch((err) => {
      console.error(err.message);
    });

  if (!user) {
    throw new Error ('Wrong login');
  }
  return user;
};

module.exports.findUsers = async () => {
  const users = await User.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!users || users.length === 0) {
    throw new Error('No users found');
  }

  return users;
};

module.exports.findUserById = async (id) => {
  const user = await User.findById(id)
    .catch((err) => {
      console.error(err.message);
    });

  if (!user) {
    throw new Error("No user found");
    // return res.status(400).json({message: 'No user found'});
  }
  
  return user;
};