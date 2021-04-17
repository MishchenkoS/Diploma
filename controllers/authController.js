const bcrypt = require('bcrypt'); //Хеширование паролей
const jwt = require('jsonwebtoken'); //Реализация веб-токенов

const { User } = require('../models/userModel');
const {JWT_SECRET} = require('../config');

module.exports.registration = async (req, res) => {
  //Добавить проверку на админа в системе
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
  const user = await User.findOne({login})
    .catch((err) => {
      console.error(err.message);
    });
  const isCorrectPassword = user ? await bcrypt.compare(password,
    user.password) : false;

  if (!user || !isCorrectPassword) {
    return res.status(400).json({message: 'Wrong login or password'});
  }
  const token = jwt.sign({login: user.login, id: user._id}, JWT_SECRET);
  res.json({jwt_token: token});
};

