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
  var query = req.query
  var sort ={}
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

  }
  db.collection(MOVIE_COLLECTION).find().sort(sort).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});


//todo: fikse søke query
router.get("/Movies/search", function(req, res) {
  console.log(req.query)
  db.collection(MOVIE_COLLECTION).find().toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// get specific movie
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
