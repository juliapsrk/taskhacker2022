const express = require('express');
const Task = require('./../models/task.js');
const routeGuard = require('./../middleware/route-guard.js');
const fileUpload = require('./../middleware/file-upload');

const taskRouter = new express.Router();

// GET - '/task/create' - renders task creation page ❌
taskRouter;

// POST - '/task/create' - handles new task creation ❌

// GET - '/task/:id' - loads task from database, renders single task page with extended info ❌

// GET - '/task/:id/edit' - loads task from database, renders task edit page ❌

// POST - '/task/:id/edit' - handles edit form submission ❌

// POST - '/task/:id/delete' - handles delete form submission ❌
