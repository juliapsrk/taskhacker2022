'use strict';

const express = require('express');
const Team = require('../models/team');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  const teamsIds = req.user ? req.user.teams : [];
  Team.find({ _id: { $in: teamsIds } })
    .then((teams) => {
      res.render('home', {
        title: 'TaskHacker 2022',
        teams /*, pageStyles: [{ style: '/styles/SCSSNAMEHERE.css' }]*/ // only change name on capital letters for page we want to style, example home
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
