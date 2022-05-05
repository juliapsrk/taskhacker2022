const express = require('express');
const Team = require('./../models/team.js');
const routeGuard = require('./../middleware/route-guard.js');

const teamRouter = new express.Router();

// GET - '/team/create' - renders team creation page ✅
teamRouter.get('/create', routeGuard, (req, res) => {
  res.render('team-create');
});

// POST - '/team/create' - handles new team creation ✅
teamRouter.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;
  // Call create method on Team model
  Team.create({
    name: req.body.name
  })
    .then((result) => {
      console.log('team created', result);
      res.redirect(`/team/${req.body._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/team/request-to-join' - renders team request-to-join list of people ❌

// GET - '/team/:id' - renders team page with members and list of kanban boards ❌
teamRouter.get('/team/:id', (req, res, next) => {
  const { id } = req.params;
  Team.findById(id)
    .populate('creator')
    .then((team) => {
      let userIsOwner =
        req.user && String(rq.user._id) === String(team.creator._id);
      res.render('team-single', { team, userIsOwner });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('TEAM_NOT_FOUND'));
    });
});

// GET - '/team/:id/edit' - loads team from database, renders team edit page ❌
teamRouter.get('team/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Team.findOne({ _id: id, creator: req.user._id })
    .then((team) => {
      if (!team) {
        throw new Error('TEAM_NOT_FOUND');
      }
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/team/:id/edit' - handles edit form submission ❌
teamRouter.post('team/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Team.findOneAndUpdate({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect(`/team/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/team/:id/delete' - handles delete form submission ❌
teamRouter.post('team/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Team.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = teamRouter;
