const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../routes/verifyToken');
const fs = require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load models
const User = require("../models/User");

// @route POST api/users/register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = {
                id: user.id,
              };

              // Sign Token
              jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {
                  expiresIn: 31556926
                },
                (err, token) => {
                  res.status(201).header('auth-token', token).json(user);
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route get api/users/profile/userId
router.get('/profile/:userId', verify, (req, res) => {

  const userId = req.params.userId;

  User.findOne({_id: userId}, (err, result) => {
    if(err) res.status(400).json(err);
    
    res.status(200).json(result.image);
  })
});

// @route PUT api/users/userId
router.put('/:userId', upload.single('avatar'), (req, res) => {

  const userId = req.params.userId;

  console.log(req.file);

  User.findOneAndUpdate({ _id: userId },
    {
      $set: {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "bio": req.body.bio,
        "image": fs.readFileSync(req.file.path)
      }
    },
    { returnNewDocument: true })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(e => {
      res.status(400).json(e);
    });
});

// @route POST api/users/login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find the user by the email
  User.findOne({ email }).then(user => {
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matches, create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign Token
        jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.header('auth-token', token).send(token);
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


module.exports = router;