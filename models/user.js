'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String
  },
  picture: {
    type: String
  },
  team: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Team'
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
