const express = require('express');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');
// const User = require('../models/user.js');
const Team = require('../models/team.js');
const User = require('../models/user.js');

const boardRouter = new express.Router();

// GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ✅
boardRouter.get('/:id', routeGuard, (req, res, next) => {
  Board.findById(req.params.id)
    .populate('creator')
    .populate('team')
    .then((board) => {
      let userIsOwner =
        req.user && String(req.user._id) === String(board.creator._id);
      req.session.boardId = board._id;
      res.render('board-single', { board, userIsOwner });
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/board/create' - handles new board creation ✅
// copy for task, adapt, test
boardRouter.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;
  //Call create method on Board model
  let board;
  Board.create({
    name: req.body.name,
    creator: req.user._id,
    team: req._id
  })
    .then((boardDocument) => {
      board = boardDocument;
      return Team.findByIdAndUpdate(req.session.teamId, {
        $push: { boards: board._id }
      });
    })
    // somehow link board to its team
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
  //   Board.findByIdAndUpdate(id)
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
