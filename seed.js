const { conn, Friend } = require('./db/index');
//const seedData = require('./seed-data.json');
const fs = require('fs');

const friendsList = async () => {
  try {
    await conn.sync({ force: true });
    console.log('Syncing success!');
    const friends = await Promise.all([
      await Friend.create({
        name: 'Sally',
        isMore: true,
      }),
      await Friend.create({
        name: 'John',
        isMore: false,
      }),
      await Friend.create({
        name: 'Khalid',
        isMore: false,
      }),
      await Friend.create({
        name: 'Catherine',
        isMore: false,
      }),
      await Friend.create({
        name: 'Adam',
        isMore: false,
      }),
    ]);
    conn.close();
    console.log('Seeding success!');
    console.log(JSON.stringify(friends, null, 2));
  } catch (err) {
    conn.close();
    console.error('Oh there is an error!');
    console.error(err.stack);
  }
};

module.exports = {
  friendsList,
};

friendsList();
