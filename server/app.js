const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const messages = require('./routes/messages');

const verify = require('./routes/verifyToken');

require('dotenv/config');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello There');
});

app.get('/posts', verify, (req, res) => {
  res.send(req.user);
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
app.use('/api/messages', messages);

app.listen(8091);