const express = require('express');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');
const Team = require('../models/team.js');

const boardRouter = new express.Router();

// GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ✅
boardRouter.get('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  // let status;
  let isToDo = false;
  let isInProgress = false;
  let isInReview = false;
  let isDone = false;
  let isWishlist = false;
  let boardFromDB;
  Board.findById(id)
    .populate('creator')
    .populate('tasks')
    .then((board) => {
      let userIsOwner =
        req.user && String(req.user._id) === String(board.creator._id);
      req.session.boardId = board._id;
      let teamId = req.session.teamId;

      boardFromDB = board;

      let toDoTasks = [];
      let inReviewTasks = [];
      let doneTasks = [];
      let wishlistTask = [];
      let inProgressTasks = [];

      for (const task of boardFromDB.tasks) {
        let taskStatus = task.status;
        task.cleanStatus = task.status.replace(/\s/g, '');
        console.log(taskStatus);
        if (taskStatus === 'To Do') {
          task.isToDo = true;
          toDoTasks.push(task);
        } else if (taskStatus === 'In Progress') {
          task.isInProgress = true;
          inProgressTasks.push(task);
        } else if (taskStatus === 'In Review') {
          task.isInReview = true;
          inReviewTasks.push(task);
        } else if (taskStatus === 'Done') {
          task.isDone = true;
          doneTasks.push(task);
        } else if (taskStatus === 'Wishlist') {
          task.isWishlist = true;
          wishlistTask.push(task);
        }
      }

      boardFromDB.toDoTasks = toDoTasks;
      boardFromDB.inProgressTasks = inProgressTasks;
      boardFromDB.inReviewTasks = inReviewTasks;
      boardFromDB.doneTasks = doneTasks;
      boardFromDB.wishlistTask = wishlistTask;

      console.log(boardFromDB.toDoTasks);

      res.render('board-single', {
        board: boardFromDB,
        userIsOwner,
        tasks: board.tasks,
        teams: teamId,
        isToDo,
        isInProgress,
        isInReview,
        isDone,
        isWishlist
      });
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/board/create' - handles new board creation ✅
boardRouter.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;
  let board;
  let member;
  Board.create({
    name: req.body.name,
    creator: req.user._id
  })
    .then((boardDocument) => {
      board = boardDocument;
      console.log('board:', board);
      return Team.findByIdAndUpdate(req.session.teamId, {
        $push: { boards: board._id }
      });
    })
    .then(() => {
      res.redirect(`/board/${board._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/board/:id/edit' - loads kanban board from database, renders board edit page ✅
boardRouter.get('/:id/edit', routeGuard, (req, res, next) => {
  res.render('board-edit', { team: req._id });
});

// POST - '/board/:id/edit' - handles edit form submission ✅
boardRouter.post('/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  Board.findOneAndUpdate({ _id: id, creator: req.user._id }, { name })
    .then(() => {
      res.redirect(`/board/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/board/:id/delete' - handles delete form submission ✅
boardRouter.post('/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Board.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = boardRouter;
