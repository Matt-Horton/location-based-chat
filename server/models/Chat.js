const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  messages: {
    type: [Object],
    default: []
  },
  users: {
    type: [Object],
    default: []
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema);