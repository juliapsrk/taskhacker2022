const express = require('express');
const Task = require('./../models/task.js');
const routeGuard = require('./../middleware/route-guard.js');
const fileUpload = require('./../middleware/file-upload');

const taskRouter = new express.Router();

// GET - '/task/create' - renders task creation page ❌
taskRouter.get('/create', routeGuard, (req, res) => {
  res.render('task-create');
});

// POST - '/task/create' - handles new task creation ❌
taskRouter.post(
  '/create',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    const { title } = req.body;
    // If there is a picture, store the url in the picture variable
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    // Call create method on Task model
    Task.create({
      title,
      description,
      creator: req.user._id
    });
  }
);

// GET - '/task/:id' - loads task from database, renders single task page with extended info ❌

// GET - '/task/:id/edit' - loads task from database, renders task edit page ❌

// POST - '/task/:id/edit' - handles edit form submission ❌

// POST - '/task/:id/delete' - handles delete form submission ❌
