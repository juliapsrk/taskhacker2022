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
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
