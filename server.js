const express = require('express');
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
app.use('/', express.static(path.join(__dirname, 'public')));

// For all GET requests that aren't going to a route, redirected to Homepage route
app.get('/', (req, res, next) => {
  res.render('index.html');
});

// Friends routes
app.use('/api', require('./src/index'));

// app.get('/api/data', async (req, res, next) => {
//   try {
//     const friend = await Promise.all([Friend.findAll()]);
//     res.send({ friend });
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.post('/api/friends', async (req, res, next) => {
//   try {
//     res.send(res.send(await Friend.create(req.body)));
//   } catch (ex) {
//     next(ex);
//   }
// });

//Handle 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
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
