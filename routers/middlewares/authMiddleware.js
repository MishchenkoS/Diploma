const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config');
const {User} = require('../../models/userModel');

module.exports.authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401)
        .json({message: 'No Authorization http header found!'});
  }
  const [, token] = header.split(' ');

  if (!token) {
    return res.status(401).json({message: 'No JWT token found!'});
  }
  req.user = jwt.verify(token, JWT_SECRET);
  next();
};

module.exports.adminRoleChecker = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId)
    .catch((err) => {
      console.error(err.message);
    });
    
  if (!user) {
    return res.status(400).json({message: 'No user found'});
  }
  if (user.role !== 'ADMIN') {
    return res.status(400).json({message: 'The user is not a admin'});
  }
  next();
};