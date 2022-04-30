const express = require('express');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const Board = require('./../models/board');
const Task = require('./../models/task');
const Team = require('./../models/team');

const profileRouter = new express.Router();

// GET - '/profile/:id/edit' - Loads user and renders profile edit view.
profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile-edit', { profile: req.user });
});

// POST - '/profile/:id/edit' - Handles profile edit form submission.

profileRouter.post('/edit', routeGuard, (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  let picture;
  if (req.file) {
    picture.req.file.path;
  }
  User.findByIdAndUpdate(id, { name, email, picture })
    .then(() => {
      res.redirect('/profile/${id}');
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/profile/:id' - Loads user with params.id from collection, renders profile page.

profileRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findById(id).then((userDocument) => {
    user = userDocument;
    if (!user) {
      throw new Error('User_');
    }
  });
});

module.exports = profileRouter;
