const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const conn = require('./db');
const { Friend } = conn.models;

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static middleware
app.use('/', express.static(path.join(__dirname, './public')));

// For all GET requests that aren't going to a route, redirected to Homepage route
app.get('/api', (req, res, next) => {
  res.redirect('/');
});

// Friends routes
app.use('/api', require('./src/index'));

//Handle 404 errors
app.use((req, res, next) => {
  const err = Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling end-ware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err.stack);
  res.send(err.message || 'Internal server error');
});

const init = async function () {
  await conn.friendsList();
  app.listen(PORT, () => console.log(`Listening On Port ${PORT}`));
};
init();
