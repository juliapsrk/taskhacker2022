'use strict';

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    unique: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tasks: [
    // this is to be able to store more than one task in one board
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
