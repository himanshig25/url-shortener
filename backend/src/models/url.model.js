const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  clickData: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    country: {
      type: String,
      default: 'Unknown'
    },
    device: {
      type: String,
      default: 'Unknown'
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model('Url', urlSchema)