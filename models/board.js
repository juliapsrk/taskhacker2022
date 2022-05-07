'use strict';

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    // required: true,
    unique: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'User'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;

// test
