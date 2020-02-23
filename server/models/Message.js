const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  chatId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);