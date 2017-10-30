
/*
 *In this file we establish a connection to our database.
 * We also establish our routes
 */
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

const MOVIE_COLLECTION = "Movies";
let USER_COLLECTION = "Users";
let MYMOVIES_COLLECTION = "MyMovies";

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// Create a database variable outside of the database connection callback to reuse the connection pool in our app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://localhost:27017/movieDB", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

// MOVIE and USER API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/Movies"
 *   GET: finds all movies
 */

app.get("/api/Movies", function(req, res) {
  db.collection(MOVIE_COLLECTION).find({},{"Rating":1,"Title":1,"Genre":1, _id:0}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

/*
 * Find info on one specific movie by id
 */
app.get("/api/Movies/:id", function(req, res) {
  db.collection(MOVIE_COLLECTION).findOne({ Rank: parseInt(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get movie");
    } else {
      res.status(200).json(doc);
    }
  });
});

/*
 *Some type of inserting movies into MyPage

app.post("/api/Movies/")*/


/*
 * Some type of user inserting and deleting
 */
router.post("/register", function(req,res) {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username
  });

  User.addUser(newUser, function(req,res)
  if (err) {
    handleError(res,err.message, "Failed to register user");
  } else {
    db.collection(USER_COLLECTION).insertOne()
  }
});

module.exports = router;


