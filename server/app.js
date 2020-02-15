const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');

require('dotenv/config');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello There');
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log('Connected to DB') 
);

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.listen(8080);