const express = require('express');
const Task = require('./../models/task.js');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');
//const fileUpload = require('./../middleware/file-upload');

const taskRouter = new express.Router();

// GET - '/task/:id' - loads task from database, renders single task page with extended info ✅
taskRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Task.findById(id)
    .then((task) => {
      console.log('task', task);
      res.render('task-single', { task, boardId: req.session.boardId });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('TASK_NOT_FOUND'));
    });
});

// fPOST - '/task/create' - handles new task creation ✅
taskRouter.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;
  const { description } = req.body;
  const { status } = req.body;
  let task;
  Task.create({
    title,
    description,
    status,
    creator: req.user._id
  })
    .then((taskDocument) => {
      task = taskDocument;
      return Board.findByIdAndUpdate(req.session.boardId, {
        $push: { tasks: task._id }
      });
    })
    .then(() => {
      res.redirect(`/task/${task._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/task/:id/edit' - loads task from database, renders task edit page ✅
taskRouter.get('/:id/edit', routeGuard, (req, res, next) => {
  console.log('req.session:', req.session);
  Task.findById(req.params.id).then((task) => {
    // condition: create var containing all enums not equal to {{task.status}}
    // pass variable to handlebars --> dynamic list tadah
    // if(req.body.status !== 'current task status')
    // const initialStatus = []
    res.render('task-edit', { board: req.session.boardId, task });
  });
});

// POST - '/task/:id/edit' - handles edit form submission ✅
taskRouter.post('/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { taskName, taskDescription, status } = req.body;
  Task.findOneAndUpdate(
    { _id: id },
    { title: taskName, description: taskDescription, status: status }
  )
    .then(() => {
      res.redirect(`/task/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/task/:id/delete' - handles delete form submission ✅
taskRouter.post('/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Task.findOneAndDelete({ _id: id })
    .then(() => {
      res.redirect(`/board/${req.session.boardId}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = taskRouter;
