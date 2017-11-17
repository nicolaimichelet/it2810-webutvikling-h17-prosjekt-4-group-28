const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config =  require('../../config/database');
const server = require('../../server');
const User = require('../../models/user');
const MOVIE_COLLECTION = "Movies";
const USERS_COLLECTION = "users";
const db = server.db;

//Our api for interacting with mongodb

//Register user - inserting user into db
router.post('/register', (req,res) => {
  let newUser = new User({
    //fields a user has
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  //The addUser function
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    }
    else {
      res.json({success: true, msg:'User registered!'});
    }
  })
});

//Authenticate user - code to get a user by Username and compare password
router.post('/authenticate', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  //checking for username
  User.getUserByUsername(username, (err, user, next) => {
    if (err) throw err;
    if (!user){
      return res.json({success: false, msg: 'User not found'});
    }
    //if user exists, we check if the password matches
    User.comparePassword(password,user.password, (err, isMatch) => {
      if (err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 //1 week until user needs to log in again
        });

        //it matches and we send response
        res.json({
          success: true,
          token: 'JWT '+token, //the tokens need to match exactly. notice the space after 'JWT '
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

//Profile - authenticates user with profile page
router.get('/profile', passport.authenticate('jwt', {session: false}), (req,res) => {
  res.json({user: req.user});
});

//set the favorite route. Find one and update favorites.
router.post('/favorite', (req,res) => {
  db.collection(USERS_COLLECTION).findOneAndUpdate({username: req.body.username}, {$addToSet: {favorites: req.body.title}}, {upsert: true}, function(err, doc){
    console.log('funka');
    if (err) {
      console.log("Failed to update favorite");
      console.log(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

//remove a favorite from the users favorites list
router.delete('/favoriteDelete', (req,res) => {
  console.log(req.query)
  db.collection(USERS_COLLECTION).update({username: req.query.username}, {$pull: {favorites: req.query.title}}, function(err, doc){
    console.log('fungertw');
    if (err) {
      console.log("Failed to delete favorite");
      console.log(err);
    } else {
      res.status(200).json(doc);
    }
  });
});



router.get("/Movies/:search_string/:sort/:type/:genre/:rating/:amount", function (req, res) {
  let query = {}
  if (req.params.search_string !== 'undefined'){
    query = {
      Title: {
        "$regex": req.params.search_string,
        "$options": "i"
      }
    }
  }
  if (req.params.genre !== 'none') {
   query['Genre'] ={
       "$regex": req.params.genre,
       "$options": "i"
     }
  }
  if (req.params.rating !== '0'){
    query['Rating']= {
      $gte: parseFloat(req.params.rating)
    }
  }

  db.collection(MOVIE_COLLECTION).find(query).sort(req.params.sort === 'none' ? {} : {[req.params.sort]: parseInt(req.params.type)})
    .limit(parseInt(req.params.amount)).toArray((err, docs) => {
    if (err) console.log(res, err, 500);
    res.status(200).json(docs);
  });

});



//get all movies, and sort based on values given
//todo: fix limit and skip fordynamic loading
/*router.get("/Movies", function(req, res) {
  let query = req.query;
  /!*  console.log(query.sort);
    let sort ={};
    let find= {};
    if(query.sort){
      if(query.order){
        if(query.order === "DESC"){
          sort[query.sort] = -1
        }
        else if(query.order === "ASC"){
          sort[query.sort] = 1
        }
        else{
          sort[query.sort] = -1
        }
      }
    }//{Title: 1, Rating: 1, Rank: 1}
    if(query.gt){
      find["Rating"] ={$gt : query.gt}
    }
    console.log(find)*!/
  const page = req.query.page * 10;
  let limit2 = 10;
  if (query.limit){
    limit2 = parseInt(query.limit);
  }else{
    limit2 = parseInt(1000)
  }

  db.collection(MOVIE_COLLECTION).find({}).limit(limit2).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});*/


// Get one genre with ?Genre=XXX
router.get("/Movies/genre", function(req, res) {
  let query = req.query
  let find = ""
  if (query.Genre){
    find= {Genre : {$regex : ".*"+query.Genre+".*"}}
  }
  console.log(find)
  db.collection(MOVIE_COLLECTION).find(find).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// get specific movie by Rank
router.get("/Movies/:id", function(req, res) {
  console.log(req.params)
  console.log("id ble vlagt")
  db.collection(MOVIE_COLLECTION).findOne({Title: (req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get movie");
    } else {
      res.status(200).json(doc);
    }
  })
});

router.get("/count/:search_string/:genre/:rating", function (req, res) {
  let query = {}
  if (req.params.search_string !== 'undefined'){
    query = {
      Title: {
        "$regex": req.params.search_string,
        "$options": "i"
      }
    }
  }
  if (req.params.genre !== 'none') {
    query['Genre'] ={
      "$regex": req.params.genre,
      "$options": "i"
    }
  }
  if (req.params.rating !== '0'){
    query['Rating']= {
      $gte: parseFloat(req.params.rating)
    }
  }

  const count = [
    { "$match":
      query
    },
    { "$group": {
      "_id": {
        "$cond": [
          { "$lte": [ "$Rating", 2 ] },
          "1",
          { "$cond": [
            { "$lte": [ "$Rating", 3 ] },
            "2",
            { "$cond": [
              { "$lte": [ "$Rating", 4 ] },
              "3",
              { "$cond": [
                { "$lte": [ "$Rating", 5 ] },
                "4",
                { "$cond": [
                  { "$lte": [ "$Rating", 6 ] },
                  "5",
                  { "$cond": [
                    { "$lte": [ "$Rating", 7 ] },
                    "6",
                    { "$cond": [
                      { "$lte": [ "$Rating", 8 ] },
                      "7",
                      { "$cond": [
                        { "$lte": [ "$Rating", 9 ] },
                        "8",
                        "9"
                      ]}
                    ]}
                  ]}
                ]}
              ]}
            ]}
          ]}
        ]
      },
      "count": { "$sum": 1 }
    }}
  ]
  amount = parseInt(req.params.amount);
  db.collection(MOVIE_COLLECTION).aggregate(count, (err, docs) => {
    if (err) console.log(res, err, 500);
    res.status(200).json(docs);
  });

});



module.exports = router;
