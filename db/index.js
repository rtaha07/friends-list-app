const Sequelize = require('sequelize');
const chalk = require('chalk');
const { STRING, INTEGER, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/friends_list_app',
  { logging: false }
); //pass false to the logging parameter to prevent sequelize from outputting SQL to console on execution

const Friend = conn.define('friend', {
  name: {
    type: STRING,
    allowNull: false,
  },
  isMore: {
    type: BOOLEAN,
    defaultValue: true,
  },
  ranking: {
    type: INTEGER,
    //defaultValue: 1,
    get: function () {
      console.log(`${this.name} ranking`);
    },
  },
});

// friend.beforeSave((friend) => {
//   console.log(friend);
//   if (friend.isMore) {
//     console.log(
//       `${friend.name} is in the top with the highest number of friends`
//     );
//   }
// });

Friend.belongsTo(Friend);

const friendsList = async () => {
  try {
    await conn.sync({ force: true });
    console.log('Syncing success!');
    const friends = await Promise.all([
      await Friend.create({
        name: 'Sally',
        isMore: true,
        ranking: 1,
      }),
      await Friend.create({
        name: 'John',
        isMore: false,
        ranking: 2,
      }),
      await Friend.create({
        name: 'Khalid',
        isMore: false,
        ranking: 3,
      }),
      await Friend.create({
        name: 'Catherine',
        isMore: false,
        ranking: 4,
      }),
      await Friend.create({
        name: 'Adam',
        isMore: false,
        ranking: 5,
      }),
    ]);
    //conn.close();
    console.log(chalk.inverse('Seeding success!'));
    console.log(JSON.stringify(friends, null, 2));
  } catch (err) {
    console.error('Oh there is an error!');
    console.error(err.stack);
    conn.close();
  }
};

module.exports = {
  friendsList,
  conn,
  models: {
    Friend,
  },
};

friendsList();
