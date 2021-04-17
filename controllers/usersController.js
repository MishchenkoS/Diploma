const bcrypt = require('bcrypt');

const {User} = require('../models/userModel');

module.exports.getUsersProfileInfo = async (req, res) => {
  const usersProfileInfo = await User.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!usersProfileInfo || usersProfileInfo.length === 0) {
    return res.status(400).json({message: 'No users found'});
  }
  res.json(usersProfileInfo); 
};

module.exports.getUserProfileInfo = async (req, res) => {
  const userProfileInfo = await User.findById(req.user.id,
      {password: 0, role: 0, __v: 0})
      .catch((err) => {
        console.error(err.message);
      });

  if (!userProfileInfo) {
    return res.status(400).json({message: 'No user found'});
  }
  res.json({user: userProfileInfo});
};


module.exports.changeUserRole = async (req, res) => {
  const adminId = req.user.id;
  const {userId, newRole} = req.body;
  const user = await User.findById(userId)
    .catch((err) => {
      console.error(err.message);
    });
  const isCorrectRole = newRole === "ADMIN" || newRole === "STUDENT" || newRole === "LEADING";

  if (!user) {
    return res.status(400).json({message: 'No user found'});
  }
  if(userId === adminId) {
    return res.status(400).json({message: 'Admin cannot change the role to himself'});
  }
  if (!isCorrectRole) {
    return res.status(400).json({message: 'Wrong existing role'});
  }

  await user.updateOne({role: newRole});
  res.json({message: 'Role changed successfully!'});
};

module.exports.changeUserPassword = async (req, res) => {
  const {userId, oldPassword, newPassword} = req.body;
  const user = await User.findById(userId)
    .catch((err) => {
      console.error(err.message);
    });
  const isCorrectPassword = user ? await bcrypt.compare(oldPassword,
      user.password) : false;

  if (!user) {
    return res.status(400).json({message: 'No user found'});
  }
  if (!isCorrectPassword) {
    return res.status(400).json({message: 'Wrong existing password'});
  }
  if (newPassword === oldPassword) {
    return res.status(400)
      .json({message: 'The new password matches the existing one'});
  }
  await user.updateOne({password: await bcrypt.hash(newPassword, 10)});
  res.json({message: 'Password changed successfully!'});
};


module.exports.deleteUserProfile = async (req, res) => {
  const {userId} = req.body;
  const user = await User.findById(userId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!user) {
    return res.status(400).json({message: 'No user found'});
  } 
  await user.deleteOne();
  res.json({message: 'Profile deleted successfully!'});
};