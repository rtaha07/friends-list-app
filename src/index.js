const axios = require('axios');
const express = require('express');
//const fs = require('fs');
const { Router } = require('express');
const router = express.Router();
const { Friend } = require('../db').models;
const { render } = require('./renderer');

router.get('/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({
      //attributes: ['name', 'ranking'],
      order: [['ranking', 'DESC']],
    });
    console.log(friends.ranking);
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

router.post('/friends', async (req, res, next) => {
  try {
    const friend = await Friend.create(req.body.name);
    console.log(friend);
    res.status(201).json(friend);
  } catch (err) {
    next(err);
  }
});

// router.get('/friends', async (req, res, next) => {
//   try {
//     const friends = await Friend.findAll();
//     console.log(req.body);
//     res.send(friends);
//   } catch (err) {
//     next(err);
//   }
// });

router.put('/friends/:id', async (req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    if (req.body.category === 'adding') {
      await friend.increment('ranking');
    } else if (req.body.category === 'subtracting') {
      await friend.decrement('ranking');
    } else if (req.body.category === 'deleting') {
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
