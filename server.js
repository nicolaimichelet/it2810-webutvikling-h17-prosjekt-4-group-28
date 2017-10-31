const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const passport = require('passport');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database')

//Connect to database
mongoose.connect(config.database);


//On connection
mongoose.connection.on('Connected', () => {
  console.log('Connected to database ' + config.database );
});

//On Error
mongoose.connection.on('Error', (err) => {
  console.log('Database error ' + err );
});

// API file for interacting with MongoDB
const api = require('./server/routes/api');


// Parsers
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


// API location
app.use('/api', api);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Index route
app.get('/', (req,res) => {
  res.send('Invalid Endpoint');
});

//CORS middleware
app.use(cors());

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

//Start server
server.listen(port, () => console.log(`Running on localhost:${port}`));
