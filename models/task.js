'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String
      // required: true
    },
    description: {
      type: String
    },
    picture: {
      type: String
    },
    status: {
      type: String,
      enum: ['to do', 'in progress', 'done', 'wishlist']
      // required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'Board'
    },
    deadline: {
      type: String
      // required: true
    }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
