const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const conn = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// For all GET requests that aren't going to an API route,
// we will send the index.html!
app.get('/', (req, res, next) => {
  res.redirect('friends');
});

app.use('/friends', require('./src/index'));

// Handle 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling end-ware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

const friendsList = async () => {
  try {
    await conn.sync();
    console.log('The database is synced!');
    app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

//friendsList();

module.exports = app;
