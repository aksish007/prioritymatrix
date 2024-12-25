const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  urgent: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  important: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  userId: {
    type: String,
    required: true
  },
  isMatrixTask: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
