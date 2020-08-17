const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Friend } = db.models;

app.use(require('body-parser').json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({
      order: [['name']],
    });
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

app.put('/api/friends/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    await friend.update(req.body);
    res.send(friend);
  } catch (err) {
    next(err);
  }
});

const PORT = process.env.PORT || 3000;

// const init = async () => {
//   try {
//     await db.syncAndSeed();
//     app.listen(PORT, () => console.log(`listening on port ${PORT}`));
//   } catch (err) {
//     console.error(err);
//   }
// };

// init();
