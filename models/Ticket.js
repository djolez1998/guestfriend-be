const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  column: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

ticketSchema.pre('save', function (next) {
  this.updated = Date.now()
  next()
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
