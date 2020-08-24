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
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// For all GET requests that aren't going to a route, redirected to Homepage route
app.get('/api', (req, res, next) => {
  res.redirect('/');
});

app.get('/api/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({
      //attributes: ['id', 'name', 'rating'],
      order: [['rating', 'DESC']],
    });
    //console.log(friends.rating);
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

app.put('/api/friends/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    if (req.body.method === 'adding') {
      await friend.increment('rating');
    } else if (req.body.method === 'subtracting') {
      await friend.decrement('rating');
    } else if (req.body.method === 'deleting') {
      await friend.delete('/api/friends/${id}');
    }
    //await friend.update(req.body);
    res.send(friend);
  } catch (err) {
    next(err);
  }
});

app.post('/api/friends', async (req, res, next) => {
  try {
    const friend = await Friend.create({ name: req.body.name });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

app.delete('/api/friends/:id', async (req, res, next) => {
  try {
    await Friend.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

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
