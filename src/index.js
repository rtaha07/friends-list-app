const axios = require('axios');
const express = require('express');
const { Router } = require('express');
const router = express.Router();
const { Friend } = require('../db').models;

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

router.get('/friends/add', async (req, res, next) => {
  try {
    const friend = `
        <form method="POST" action="api/friends">
        <input name="name" />
        <button><span onclick="create()" class="addName">Create</span></button>
        </form>`;
    // const List = document.getElementById('friends-list');
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
    res.redirect(`/friends/add`);
    //res.status(201).json(friend);
  } catch (err) {
    next(err);
  }
});

router.get('/data', async (req, res, next) => {
  try {
    const friends = await Friend.findAll();
    const friendsList = friends
      .map((friend) => {
        return `
            <h1>${friend.name} </h1>
            <li className="friend-name" data-id='/friends/${friend.id}'>
              <span>(${friend.ranking})</span>
              <button type="button" id="subtract-friend" onclick="removeOne()">-</button>
              <button type="button" id="add-friend" onclick="addOne()">+</button>
              <button type="button" id="clear-name" onclick="delete(friend.name)">x</button>
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
    if (req.body.category === 'add-friend') {
      await friend.increment('ranking');
    } else if (req.body.category === 'subtract-friend') {
      await friend.decrement('ranking');
    } else if (req.body.category === 'clear-name') {
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
