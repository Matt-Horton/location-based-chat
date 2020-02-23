const express = require('express');
const router = express.Router();
const verify = require('../routes/verifyToken');

// Load Message model
const Message = require('../models/Message');

// @route POST /api/messages/post
router.post('/post', verify, (req, res) => {

  const newMessage = new Message({
    userId: req.user.id,
    chatId: req.body.chatId,
    content: req.body.content
  });

  newMessage.save()
    .then(message => {
      res.status(201).json(message);
    })
    .catch(e => console.log(e));
});

// @route GET /api/messages/
router.get('/', verify, (req, res) => {
  Message.find({}, (err, result) => {
    if(err) res.status(400).json(err);
    
    res.status(200).json(result);
  })
});


module.exports = router;