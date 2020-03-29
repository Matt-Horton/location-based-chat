const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const http = require("http");
const socketIo = require("socket.io");
const uuid = require('uuid');

const users = require('./routes/users');
const messages = require('./routes/messages');
const chats = require('./routes/chats');

const Chat = require('./models/Chat');
const Message = require('./models/Message');
const User = require('./models/User');

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
app.use('/api/chats', chats);

const port = 8091;

const server = http.createServer(app);

const io = socketIo(server);
io.on('connection', socket => {
  let userId = socket.handshake.query.userId;
  let chatId = socket.handshake.query.chatId;


  User.findById(userId, (err, user) => {
    Chat.findById(chatId, (err, chat) => {
      const userExistsInChat = chat.users
        .filter(u => u.email == user.email);

      console.log(userExistsInChat);
      if (userExistsInChat.length === 0) {
        Chat.findOneAndUpdate(
          { _id: chatId },
          { $push: { users: user } },
          function (error, success) {
            if (error) {
              res.status(400).json(error);
            } else {
              //console.log('Saved user', success);
            }
          });
      }
    })
  });

  socket.on("chat message", msg => {
    console.log(msg);
    const newMessage = new Message({
      _id: uuid.v4(),
      userId: msg.userId,
      chatId: msg.chatId,
      content: msg.content
    });

    Chat.findOneAndUpdate(
      { _id: msg.chatId },
      { $push: { messages: newMessage } },
      function (error, success) {
        if (error) {
          res.status(400).json(error);
        } else {
          console.log('Saved message', success);
          io.emit("chat message", newMessage);
        }
      });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));