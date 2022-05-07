const express = require('express');
const Task = require('./../models/task.js');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');
//const fileUpload = require('./../middleware/file-upload');

const taskRouter = new express.Router();

// GET - '/task/create' - renders task creation page ❌
taskRouter.get('/create', routeGuard, (req, res) => {
  res.render('task-create');
});

// POST - '/task/create' - handles new task creation ❌
taskRouter.post(
  '/create',
  routeGuard,
  //fileUpload.single('picture'),
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
      creator: req.user._id,
      board: req.board._id,
      createdAt,
      deadline
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

// GET - '/task/:id' - loads task from database, renders single task page with extended info ❌
taskRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Task.findById(id)
    .populate('creator')
    .then((task) => {
      let userIsOwner =
        req.user && String(rq.user._id) === String(task.creator._id);
      res.render('task-single', { task, userIsOwner });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('TASK_NOT_FOUND'));
    });
});

// GET - '/task/:id/edit' - loads task from database, renders task edit page ❌
taskRouter.get('/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Task.findOne({ _id: id, creator: req.user._id })
    .then((task) => {
      if (!task) {
        throw new Error('TASK_NOT_FOUND');
      }
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/task/:id/edit' - handles edit form submission ❌
taskRouter.post(
  '/:id/edit',
  routeGuard,
  // fileUpload.single('picture'),
  (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    const { description } = req.body.description; /* ?? */
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Task.findOneAndUpdate(
      { _id: id, creator: req.user._id },
      { title, description, picture }
    )
      .then(() => {
        res.redirect(`/task/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

// POST - '/task/:id/delete' - handles delete form submission ❌
taskRouter.post('/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Task.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = taskRouter;
