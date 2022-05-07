const express = require('express');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');
const User = require('../models/user.js');

const boardRouter = new express.Router();

// GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ❌
boardRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('board-create');
});

// POST - '/board/create' - handles new board creation ❌

boardRouter.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;
  //Call create method on Board model
  let board;
  Board.create({
    name: req.body.name,
    creator: req.user._id
  })
    .then((boardDocument) => {
      board = boardDocument;
<<<<<<< HEAD
      return User.findById(req.user._id).populate('teams');
      return board.findByAndUpdate(req.user._id, {
=======
      return Board.findByAndUpdate(req.user._id, {
>>>>>>> 300034ec36f7c2fd58628ad29b89a751edfd4765
        $push: { boards: board._id }
      });
    })
    .then(() => {})
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
