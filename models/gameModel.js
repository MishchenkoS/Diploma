const mongoose = require('mongoose');
const { Test } = require('./testModel');

const gameSchema = new mongoose.Schema({
  nameGame: {
    type: String,
    uniq: true,
    required: true
  },
  rounds: {
    type: [[mongoose.Schema.Types.ObjectId]],
    ref: 'Test',
    required: true,
    
  },
  created_date: {
    type: Date,
    default: Date.now(),
  }, 
});

module.exports.Game = mongoose.model('Game', gameSchema);  