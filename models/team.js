'use strict';

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
