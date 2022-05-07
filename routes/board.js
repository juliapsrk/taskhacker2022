const express = require('express');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');
// const User = require('../models/user.js');
const Team = require('../models/team.js');

const boardRouter = new express.Router();

// GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ✅
boardRouter.get('/:id', routeGuard, (req, res, next) => {
  Board.findById(req.params.id)
    .populate('creator')
    .populate('team')
    .then((board) => {
      req.session.boardId = board._id;
      res.render('board-single', { board });
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
    .then(() => {
      res.redirect(`/board/${board._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/board/:id/edit' - loads kanban board from database, renders board edit page ❌

// POST - '/board/:id/edit' - handles edit form submission ❌

// POST - '/board/:id/delete' - handles delete form submission ❌

module.exports = boardRouter;
