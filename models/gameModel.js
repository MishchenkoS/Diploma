const mongoose = require('mongoose');
const { Test } = require('./testModel');

const gameSchema = new mongoose.Schema({
  nameGame: {
    type: String,
    uniq: true,
    required: true
  },
  leadings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  },
  players: {
    type: [String],
    required: true
  },
  //Игроки/команды
  type: {
    type: String,
    required: true
  },
  rounds: {
    // type: [[mongoose.Schema.Types.ObjectId]],
    type: [mongoose.Schema.Types.Mixed],
    // ref: 'Test',
    required: true,
    
  },
  created_date: {
    type: Date,
    default: Date.now(),
  }, 
});

module.exports.Game = mongoose.model('Game', gameSchema);  