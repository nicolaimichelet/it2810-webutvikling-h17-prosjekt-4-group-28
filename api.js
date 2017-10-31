const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;

var MOVIE_COLLECTION = "Movies";



function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

//get all movies, and sort based on values given
router.get("/Movies", function(req, res) {
  let query = req.query;
  console.log(query.sort);
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
  console.log(find)
  db.collection(MOVIE_COLLECTION).find({}).sort(sort).start(x).limit(y).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});


// Få kun en sjanger med ?Genre=XXX
router.get("/Movies/genre", function(req, res) {
  var query = req.query
  var find = ""
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
  console.log("id ble vlagt")
  db.collection(MOVIE_COLLECTION).findOne({Rank: parseInt(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get movie");
    } else {
      res.status(200).json(doc);
    }
  })
});

module.exports = router;
