const express = require('express');
const Board = require('./../models/board.js');
const routeGuard = require('./../middleware/route-guard.js');

const boardRouter = new express.Router();

// GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ❌

// GET - '/board/:id/edit' - loads kanban board from database, renders board edit page ❌

// POST - '/board/:id/edit' - handles edit form submission ❌

// POST - '/board/:id/delete' - handles delete form submission ❌

module.exports = boardRouter;
