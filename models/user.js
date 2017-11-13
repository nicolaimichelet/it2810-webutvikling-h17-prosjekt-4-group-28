const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//This is the model for the user. Uses mongoose schema, user functions and we encrypt the password.

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{
    type: [String]
  }]
});

//Declare our model User
const User = module.exports = mongoose.model('User', UserSchema);

//Gets a user by their ID
module.exports.getUserByID = function (id, callback){
  User.findById(id,callback);
};
//Gets a user by the username
module.exports.getUserByUsername = function (username, callback){
  const query = {username: username};
  User.findOne(query,callback);
};
//We add the user, and hash password by using plugin bcrypt
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw error;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
//Compare actual password with candidate password. If no match, we throw err
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};

