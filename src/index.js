const axios = require('axios');
const express = require('express');
const { Router } = require('express');
const router = express.Router();
const { Friend } = require('../db').models;
const { render } = require('./renderer');

router.get('/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({
      attributes: ['id', 'name', 'rating'],
      order: [['rating', 'DESC']],
    });
    //console.log(friends.rating);
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

router.post('/friends', async (req, res, next) => {
  try {
    const friend = await Friend.create({ name: req.body.name });
    //console.log(friend);
    await friend.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.put('/friends/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    if (req.body.method === 'adding') {
      await friend.increment('rating');
    } else if (req.body.method === 'subtracting') {
      await friend.decrement('rating');
    } else if (req.body.method === 'deleting') {
      await friend.delete('/friends/${id}');
    }
    await friend.update(req.body);
    res.send(friend);
  } catch (err) {
    next(err);
  }
});

router.delete('/friends/:id', async (req, res, next) => {
  try {
    await Friend.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
