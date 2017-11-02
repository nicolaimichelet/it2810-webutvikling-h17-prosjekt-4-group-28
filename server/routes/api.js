const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config =  require('../../config/database');

const User = require('../../models/user');


//Register user
router.post('/register', (req,res) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    }
    else {
      res.json({success: true, msg:'User registered!'});
    }
  })
});


//Authenticate user
router.post('/authenticate', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

    //checking for username
  User.getUserByUsername(username, (err, user, next) => {
    if (err) throw err;
    if (!user){
      return res.json({success: false, msg: 'User not found'});
    }
    //if it exists, we check for password
    User.comparePassword(password,user.password, (err, isMatch) => {
      if (err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 //1 week until user needs to log in again
        });

        //it matches and we send response
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
          }
        });
        //password doesn't match and we send this response
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req,res) => {
  res.json({user: req.user});
});

module.exports = router;
