const bcrypt = require('bcrypt');

const {User} = require('../models/userModel');
const userDao = require('../dao/userDao');
const { Game } = require('../models/gameModel');

module.exports.getUsersProfileInfo = async (req, res) => {
  const usersProfileInfo = await userDao.findUsers();
  res.json(usersProfileInfo); 
};

module.exports.getUserProfileInfo = async (req, res) => {
  let userId = req.user.id;
  if(req.params.userId){
    userId = req.params.userId
  }

  const userProfileInfo = await userDao.findUserById(userId)
  res.json({user: userProfileInfo});
};

module.exports.changeUser = async (req, res) => {
  const { login, password, firstname, lastname, group, team, role} = req.body;
  const user = await userDao.findUserById(req.params.userId);

  await user.updateOne({
    login,
    password: await bcrypt.hash(password, 10),
    firstname,
    lastname,
    group,
    team,
    role,
  });

  res.json({message: 'User changed successfully!'});
}

module.exports.changeUserRole = async (req, res) => {
  const adminId = req.user.id;
  const userId = req.params.userId;
  const {newRole} = req.body;
  const user = await userDao.findUserById(userId);
  const isCorrectRole = newRole === "ADMIN" || newRole === "STUDENT" || newRole === "LEADING";

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
  const {oldPassword, newPassword} = req.body;
  const user = await userDao.findUserById(req.params.userId);

  if (!(await bcrypt.compare(oldPassword, user.password))) {
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
  const userId = req.params.userId;
  console.log("delete")
  const user = await userDao.findUserById(userId);
  const games = await Game.find({})
    .catch((err) => {
      console.error(err.message);
    });

  let exit = true;

  if(games) {
    for(let i = 0; i < games.length; i++) {
      exit = true;

      for(let j = 0; exit && j < games[i].leadings.length; j++) {
        if(games[i].leadings[j] === userId) {
          games[i].leadings.splice(j, 1);
          if(games[i].leadings.length === 0) {
            await games[i].deleteOne();
            games.splice(i, 1);
            i--;
            exit = false;
            break;
          }
          await games[i].updateOne({leadings : games[i].leadings});
          j--;
        }
      }

      for(let j = 0; exit && j < games[i].players.length; j++) {
        if(games[i].players[j] === userId) {
          games[i].players.splice(j, 1);
          if(games[i].players.length === 0) {
            await games[i].deleteOne();
            games.splice(i, 1);
            i--;
            exit = false;
            break;
          }
          await games[i].updateOne({players : games[i].players});
          j--;
        }
      }
    }
  }

  await user.deleteOne();
  res.json({message: 'Profile deleted successfully!'});
};