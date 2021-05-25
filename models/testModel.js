const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  complexity: {
    type: Number,
    required: true,
    default: 0
  },
  type: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  img_question: {
    type: String,
    default: ""
  },
  answers: {
    type: [String],
    required: true,
  },
  // answers: {
  //   type: mongoose.Schema.Types.Mixed,
  //   required: true,
  // },
  img_answers: {
    type: [String],
  },
  true_answers: {
    type: [String],
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  }, 
});

module.exports.Test = mongoose.model('Test', testSchema);