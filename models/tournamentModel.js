const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Start"
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
          //знчение - массив ответов
        }
      }
    ]
  ],
  balls: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  created_date: {
    type: Date,
    default: Date.now(),
  }, 
  
});

module.exports.Tournament = mongoose.model('Tournament', tournamentSchema);