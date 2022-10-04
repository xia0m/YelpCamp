# [YelpCamp](https://yelpcamp.alexma.one/)

This is a Node.js application inspired by Colt Steele's Udemy course. For a live demo, click [here](https://yelpcamp.alexma.one/)

## Table of Content
- [YelpCamp](#yelpcamp)
  - [Table of Content](#table-of-content)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [TechStack](#techstack)
  - [LICENSE](#license)

## Installation
Create a new file named `.env`, add a new environment viriable DATABASEURL that equals to mongo uri
```
  git clone 
  cd 
  npm install
  npm start
```

## Usage
* Basic functionality
  * A user can sign up/login to this website.
  * A user can add campground with related infomation.
  * A user can add comment to each camp ground.
* Middleware
  * Check to see if a user is logged in to use basic functinality.
  * User's password is encrypted

## Deployment
* Follow [Heroku's guid]() to create a new project
* Under settings, add 'DATABASEURL' and according mongoDB address as environment variable
* Deploye your project

## TechStack
* Front End
  * pug
  * Bootstrap
* Back End
  * Express
  * MongoDB/Mongoose
  * Passport
  * connect-flash
  * method-override

## LICENSE
  Licensed under the [MIT](./LICENSE) License.


