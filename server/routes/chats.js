const express = require('express');
const router = express.Router();
const verify = require('../routes/verifyToken');

const Chat = require('../models/Chat');

// @route POST /api/chats/create
router.post('/create', verify, (req,res) => {

  const newChat = new Chat({
    name: req.body.name,
    location: {
      type: 'Point',
      coordinates: [100.0, 50.0]
    }
  });

  newChat.save()
    .then(chat => {
      res.status(201).json(chat);
    })
    .catch(e => console.log(e));
});

// @route GET /api/chats
router.get('/', verify, (req, res) => {
  Chat.find({}, (err, result) => {
    if(err) res.status(400).json(err);
    
    res.status(200).json(result);
  });
});

// @route GET /api/chats/id
router.get('/:chatId', verify, (req, res) => {
  const id = req.params.chatId;
  console.log(id);
  Chat.findOne({_id: id}, (err, result) => {
    if(err) res.status(400).json(err);
    
    res.status(200).json(result);
  })
});

module.exports = router;