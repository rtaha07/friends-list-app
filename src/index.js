const express = require('express');
const router = express.Router();
const { Friend } = require('../db').models;

const { Friend } = require('../db/index');

// API routes
// router.get('/', async (req, res, next) => {
//   try {
//     const friends = await Friend.findAll({
//       order: [['name']],
//     });
//     res.send(friends);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({ group: 'name' });
    res.json(friends);
  } catch (err) {
    next(err);
  }
});

router.post('/friends', async (req, res, next) => {
  try {
    const friend = await Friend.create({
      name: req.body.name,
      ranking: req.body.ranking,
    });
    res.redirect(`/friends/${friend.id}`);
  } catch (err) {
    next(err);
  }
});

router.get('/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({
      order: [['ranking']],
    });
    res.json(friends);
  } catch (err) {
    next(err);
  }
});

router.get('/add', async (req, res, next) => {
  try {
    const friends = await Friend.findAll();
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    res.send(friend);
  } catch (err) {
    next(err);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    await friend.update(req.body);
    res.send(friend);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
