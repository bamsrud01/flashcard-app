# Flashcard Application

This application allows users to create sets of flashcards and use them for study.  Any user may review the sets of cards that have already been created, but only registered users may create and comment on sets.  Registered users may also view a calendar, and the application will schedule recommended dates to review sets.  The dates will vary based on performance.  For example, if a user makes several mistakes, the application will recommend reviewing earlier than if the user made no mistakes.

## Features

- User registration and Authentication using Passport.js
- Flashcard set creation and updating
- Filter sets by category
- Ability to comment on entire sets, as well as comment on a card-by-card basis
- Shuffle cards and review on an individual basis, with a performance report at the end of the set
- Schedule and view recommended dates to review sets, with varying recommendations based on performance
- Ability to add images to the flashcards, either by uploading from the user's computer, or pasting a URL for an existing image

## Future Goals

- Add different modes, such as providing multiple possible choices, and asking the user to pick the correct answer
- Ability to rate and favorite flashcard sets
- Improve visual information in calendar
- Allow updates to be made more easily
- Improve styling of the application
- Search for flashcard sets based on a search term
- Host the application on Heroku

## Installation and Use

- Clone application into desired directory
- Navigate into directory and run 'npm install'
- Create a SQL database named 'solo' OR change the config property in db/connection.js
- Create tables by running SQL commands found in database.sql
- Run 'npm start'
- Go to http://localhost:3000
- Enjoy!

## Technologies Used
- JavaScript, Express.js, Passport.js, AngularJS, Bootstrap, PostgreSQL, Angular-Boostrap Calendar (by mattlewis92), multer, Moment.js

## Author
- Barrett Amsrud
- Prime Digital Academy Solo Project
- October - November 2016
