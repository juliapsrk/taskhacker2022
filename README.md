README.md

# Ironhack Project 2

## Project Outline

- Needs to handle authentication features (sign up, sign in, log out) 🔒
- Needs to handle at least 2 models (incl. User model; so just 1 extra one) 🍊 🍋
- Needs to perform all CRUD operations on a model that is not the User model ✍🏼 📖 ✨ 💣
- Should be pushed to a GitHub repo and deployed on Heroku by end of week 1, even if unfinished☁️

Before the presentation

- Clean up database 💥

## Application

Name: taskhacker2022

- task/productivity manager

- user can sign up and create a profile ✅

- user can create new team and/or join existing team ✅

- user can create tasks (text + images)
- user can edit and delete tasks
- user can change status of task

- user can edit profile ✅

## Pages

Home
Home - Preview of Kanban (not yet logged in/signed up)
Home - Kanban view

Authentication
Sign up - Allows visitors to create an account
Sign in - Allows Existing users to sign in

Team
Team - Displays team with name, boards, members, creator
Create a new board - displays a form that allows team members to create a new board
Edit an existing board - displays a form that allows board creator to edit board
Delete a board - allows board creator to delete board

Board
Board - Displays kanban board with tasks in different categories
Create a task - Displays a form that allows a user to create a new task within each category (so new task button for to do, for in progress, for done, etc.)
Edit a task - Displays a form that allows a user to edit his post
Delete a task - Allows user to delete his post

Profile
User Profile - Displays a page with user information, profile photos
Edit Profile - displays a form that allows user to edit his profile

Tasks?

## Route Handlers

Home

- GET - '/' Renders home page ✅

Authentication

- GET - '/authentication/sign-up' - Renders sign up page ✅
- POST - '/authentication/sign-up' - Handles account registration ✅
- GET - '/authentication/sign-in' - Renders Sign in page ✅
- POST - '/authentication/sign-in' - Handles existing user authentication ✅
- POST - '/authentication/sign-out' - Handles usersign out ✅

User

- GET - '/profile/:id' - renders user's profile page ✅
- GET - '/profile/:id/edit' - loads profile from database, renders profile edit page ✅
- POST - '/profile/:id/edit' - handles edit form submission ✅

Team

- GET - '/team/create' - renders team creation page ✅
- POST - '/team/create' - handles new team creation ✅
- GET - '/team/:id' - renders team page with members and list of kanban boards ✅
- GET - '/team/:id/edit' - loads team from database, renders team edit page ✅
- POST - '/team/:id/edit' - handles edit form submission ✅
- POST - '/team/:id/delete' - handles delete form submission ✅

- GET - '/team/search' - renders team request-to-join list of people ✅
- POST - '/:id/join' - ✅

Board

- POST - '/board/create' - handles new board creation ✅
- GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ✅
- GET - '/board/:id/edit' - loads kanban board from database, renders board edit page ✅
- POST - '/board/:id/edit' - handles edit form submission ✅
- POST - '/board/:id/delete' - handles delete form submission ✅

Task

- POST - '/task/create' - handles new task creation ✅
- GET - '/task/:id' - loads task from database, renders single task page with extended info ✅
- GET - '/task/:id/edit' - loads task from database, renders task edit page ✅
- POST - '/task/:id/edit' - handles edit form submission ✅
- POST - '/task/:id/delete' - handles delete form submission ✅

## Saturday MVP Check // Feedback

- finalise routes and views
- styling, keep as intuitive as possible

## Models

User

- name: String ✅
- email: String, required ✅
- passwordHashAndSalt: String ✅
- picture: String ✅
- team id: objectId ✅

email nodemailer invite users to team, id query.params

Team

- team id: objectId ✅
- name: String, required ✅

Board (a collection of tasks)

- team id: objectId ✅
- creator id: objectId ✅
- name: String ✅

Task

- board id ✅
- creator id ✅
  - createdAt -- timestamp ❌
  - deadline (user can set time for particular task) ❌
- status (todo, in progress, done) ❌
- title ✅
- description (editable using summernote) ✅
  <!-- - color -->
  <!-- positioning of status done in HTML & CSS, add property for "done", "in progress", "done", in view hbs files: each, if done, then render tasks that have that property -->

## Wishlist

- Expenses Tracker
- Calendar Feature

## Notes

Agile method -- trello form, different tables
