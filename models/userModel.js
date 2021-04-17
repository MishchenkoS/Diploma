const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    uniq: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  team: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "STUDENT"
  },
  created_date: {
    type: Date,
    default: Date.now(),
  }, 
});

module.exports.User = mongoose.model('User', userSchema);