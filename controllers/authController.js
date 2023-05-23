const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const { User } = require('../models/userModel');
const {JWT_SECRET} = require('../config');
const userDao = require('../dao/userDao');

module.exports.registration = async (req, res) => {
  const {login, password, firstname, lastname, group, team, role} = req.body;
  const user = await User.findOne({login})
    .catch((err) => {
      console.error(err.message);
    });

  if (user) {
    return res.status(400).json({message: `Login ${login} already exists`});
  }

  const newUser = new User({
    login,
    password: await bcrypt.hash(password, 10),
    firstname,
    lastname,
    group,
    team,
    role,
  });
  
  await newUser.save();
  res.json({message: 'Profile created successfully!'});
};

module.exports.login = async (req, res) => {
  const {login, password} = req.body;
  const user = await userDao.getUserByLogin(login);

  console.log(login, password, user);

  if (!(await bcrypt.compare(password, user.password))) {
    console.log("if")
    return res.status(400).json({message: 'Wrong password'});
  }
  
  const token = jwt.sign({login: user.login, id: user._id}, JWT_SECRET);
  res.json({jwtToken: token, userId: user._id, role: user.role, message: 'Вы вошли в систему'});
};

