const axios = require('axios');
const express = require('express');
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

router.get('/friends', async (req, res, next) => {
  try {
    const friend = `
        <form method="POST" action="api/friends">
        <input type="text" name="name" class="addName" />
        <button type="button" class="addName">Create</button>
        </form>`;
    // const List = document.getElementById('friendsList');
    // List.innerHTML = friend;
    res.send(friend);
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

router.get('/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll();
    const friendsList = friends
      .map((friend) => {
        return `
            <h1>${friend.name} </h1>
            <li classList="friend-name" data-id='/friends/${friend.id}'>
              <span>(${friend.ranking})</span>
              <button type="button" id="subtract-friend">-</button>
              <button type="button" id="add-friend">+</button>
              <button type="button" id="clear-name">x</button>
            </li>
      `;
      })
      .join('');
    // const List = document.querySelector('#friendsList');
    // List.innerHTML = friendsList;
    console.log(req.body.ranking);
    res.send(friendsList);
  } catch (err) {
    next(err);
  }
});

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
