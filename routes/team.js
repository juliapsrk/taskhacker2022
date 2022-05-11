const express = require('express');
const Team = require('./../models/team.js');
const routeGuard = require('./../middleware/route-guard.js');
const User = require('../models/user.js');

const teamRouter = new express.Router();

// GET - '/team/create' - renders team creation page ✅
teamRouter.get('/create', routeGuard, (req, res) => {
  res.render('team-create');
});

// POST - '/team/create' - handles new team creation ✅
teamRouter.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;
  let team;
  let member;
  Team.create({
    name: req.body.name,
    creator: req.user._id
  })
    .then((teamDocument) => {
      team = teamDocument;
      return User.findByIdAndUpdate(req.user._id, {
        $push: { teams: team._id }
      });
    })
    .then((memberDocument) => {
      member = memberDocument;
      return Team.findByIdAndUpdate(team._id, {
        $push: { members: member._id }
      });
    })
    .then(() => {
      res.redirect(`/team/${team._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/team/search' - ✅
teamRouter.get('/search', routeGuard, (req, res, next) => {
  const { query } = req.query;
  console.log(query);
  // let team;
  Team.findOne({ name: query })
    .populate('creator')
    .then((result) => {
      console.log(result);
      if (result.members.includes(String(req.user._id))) {
        res.redirect(`/team/${result._id}`);
        //res.render('search-results', result);
      } else {
        res.render('search-results', result);
      }
    })
    .catch((error) => {
      console.log(error);
      next(new Error('TEAM_DOES_NOT_EXIST'));
    });
});

// POST - '/:id/join' - ✅
teamRouter.post('/:id/join', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Team.findByIdAndUpdate(
    id,
    { $push: { members: req.user._id } },
    { new: true }
  )
    .then((result) => {
      console.log(req.user._id);
      console.log(result);
      return User.findByIdAndUpdate(req.user._id, { $push: { teams: id } });
    })
    .then(() => {
      res.redirect(`/team/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/team/:id' - renders team page with members and list of boards ✅
teamRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Team.findById(id)
    .populate('creator')
    .populate('boards')
    .populate('members')
    .then((team) => {
      let userIsOwner =
        req.user && String(req.user._id) === String(team.creator._id);
      req.session.teamId = team._id;
      res.render('team-single', { team, userIsOwner });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('TEAM_NOT_FOUND'));
    });
});

// GET - '/team/:id/edit' - loads team from database, renders team edit page ✅
teamRouter.get('/:id/edit', routeGuard, (req, res, next) => {
  res.render('team-edit', { team: req._id });
});

// POST - '/team/:id/edit' - handles edit form submission ✅
teamRouter.post('/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  //   Team.findByIdAndUpdate(id)
  Team.findOneAndUpdate({ _id: id, creator: req.user._id }, { name })
    .then(() => {
      res.redirect(`/team/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/team/:id/delete' - handles delete form submission ✅
teamRouter.post('/:id/delete', routeGuard, (req, res, next) => {
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
