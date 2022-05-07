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

<!-- Calendar
Create an event - Displays a form that allows a user to create/submit a new post
Single event - click from home page onto bigger view of post (single post view) with a little more info, show interactions
Edit a event - Displays a form that allows a user to edit his post
Delete a event - Allows user to delete his post -->

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

- GET - '/team/:id' - renders team page with members and list of kanban boards ✅
- GET - '/team/create' - renders team creation page ✅
- POST - '/team/create' - handles new team creation ✅
- GET - '/team/:id/edit' - loads team from database, renders team edit page ✅
- POST - '/team/:id/edit' - handles edit form submission ✅
- POST - '/team/:id/delete' - handles delete form submission ✅
- GET - '/team/request-to-join' - renders team request-to-join list of people ❌

Board

- GET - '/board/:id' - renders specific kanban board with tasks listed in kanban view with limited info ✅
- POST - '/board/create' - handles new board creation ✅
- GET - '/board/:id/edit' - loads kanban board from database, renders board edit page ✅
- POST - '/board/:id/edit' - handles edit form submission ✅
- POST - '/board/:id/delete' - handles delete form submission ✅

Task

- GET - '/task/:id' - loads task from database, renders single task page with extended info ❌
- GET - '/task/create' - renders task creation page ❌
- POST - '/task/create' - handles new task creation ❌
- GET - '/task/:id/edit' - loads task from database, renders task edit page ❌
- POST - '/task/:id/edit' - handles edit form submission ❌
- POST - '/task/:id/delete' - handles delete form submission ❌

## Models

User

- name: String, required ✅
- email: String, required ✅
- passwordHashAndSalt: String, required ✅
- picture: String ✅
- team id: objectId ✅

email nodemailer invite users to team, id query.params

1. User1 registers and creates an account
2. User1 decides to create a new team
3. A new Team object is created in the Teams collection. The Team ObjectId is saved in the 'team' property for this User
4. The user can now create a new board
5. The team Id is also stored as a property of the board

6. User2 registers and creates an account
7. User2 decides to join an existing team -> It is prompted to ask "the existing member(s) of the team to follow some instructions (ideally, an "Add Team member button visibile for User1 somewhere in the app) -> The flow stops here
8. User1 goes to this "Add Team member" button, which asks them to input an email address for the team member to add
9. An email is sent to that address, in the email there is a link that contains the team Id (e.g. kanbantool.com?123456789 where 123456789 is the team ID)
10. User2 clicks on the link and the team ID is used to perform a POST request and add the Team Id to the 'team' property of User2

Team

- team id: objectId ✅
- name: String, required ✅
<!-- NO ARRAY OF USERS DON'T DO IT -->

Board (a collection of tasks)

- team id: objectId ❌
- creator id: objectId ❌
- name: String, required ❌
<!-- allow access//admin rights to everyone on team -->

Task

- board id ❌
- creator id ❌
  - createdAt -- timestamp ❌
  - deadline (user can set time for particular task) ❌
- status (todo, in progress, done) ❌
- title ❌
- description (editable using summernote) ❌
  <!-- - color -->
  <!-- positioning of status done in HTML & CSS, add property for "done", "in progress", "done", in view hbs files: each, if done, then render tasks that have that property -->

## Wishlist

Expenses Tracker

Expenses

Drag and drop feature - By clicking and holding on the task user will be able to drag it to the relevant status column (to do, in progress, completed, )
/////////////////////////

Calendar (view of events (& tasks?)) : - npm package for calendar/dates

- creator id: objectId

Event

- creator id
- calendar id
- title
- description

## Notes

Agile method -- trello form, different tables

- to do
- in progress
- (in review)
- done
- (wishlist)
