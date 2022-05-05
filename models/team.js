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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
