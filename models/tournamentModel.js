const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
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
  //Закончена, играется
  status: {
    type: String,
    required: true
  },
  rounds: [
    [ 
      {
        testId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Test'
        },
        status: {
          type: String,
        },
        responders: {
          type: [String],
        },
        answers: {
          type: mongoose.Schema.Types.Mixed
        }
      }
    ]
  ]
  
});

module.exports.Tournament = mongoose.model('Tournament', tournamentSchema);