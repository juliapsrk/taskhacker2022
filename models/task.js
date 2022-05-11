'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    picture: {
      type: String
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'In Review', 'Done', 'Wishlist']
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board'
    },
    deadline: {
      type: String
    }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
