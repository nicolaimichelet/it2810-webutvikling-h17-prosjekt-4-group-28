const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/MovieDB', { useMongoClient: true });
const db = mongoose.connection;
module.exports = {db};

//Check if connected to database
db.on('error', err => {
  console.log('Error while connecting to DB: ${err.message}') ;
});
db.once('open', () => {
  console.log('Server connected successfully to DB!');
});

const api = require('./api');

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '8084';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
