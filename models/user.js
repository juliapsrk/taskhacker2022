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
    type: String,
    default: 'https://taskhacker2022.herokuapp.com/images/defaultPicture.png'
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
});

const User = mongoose.model('User', schema);

module.exports = User;
