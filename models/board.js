'use strict';

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
