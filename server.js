const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/movieDB', { useMongoClient: true });
const db = mongoose.connection;
module.exports = {db};

//Check if connected to database
db.on('error', err => {
  console.log('Error while connecting to DB: ${err.message}') ;
});
db.once('open', () => {
  console.log('Server connected successfully to DB!');
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Get our API routes
const api = require('./api');

// Set our api routes
app.use('/api', api);

app.set('port', '8084');

// Create HTTP server.
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen('8084', () => console.log(`API running on localhost: 8084`));
