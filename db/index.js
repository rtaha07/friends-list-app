const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize('postgres://localhost/friend_list_app');
//const faker = require('faker');

const Friend = conn.define('friend', {
  name: {
    type: STRING,
  },
});

module.exports = {
  models: {
    Friend,
  },
};
