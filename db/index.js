const Sequelize = require('sequelize');
const { STRING, INTEGER, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/friends_list_app',
  { logging: false }
); //pass false to the logging parameter to prevent sequelize from outputting SQL to console on execution

const chalk = require('chalk');

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
    get: function () {
      console.log(`${this.name} ranking`);
    },
  },
});

user.beforeSave((friend) => {
  console.log(friend);
  if (friend.isMore) {
    console.log(
      `${friend.name} is in the top with the highest number of friends`
    );
  }
});

Friend.belongsTo(Friend);

// const friendsList = async () => {
//   try {
//     await conn.sync({ force: true });
//     const promises = [];
//     while (promises.length < 5) {
//       promises.push(
//         Friend.create({
//           name: faker.name.firstName(),
//           isMore: faker.random.boolean(),
//         })
//       );
//     }
//     await Promise.all(promises);
//   } catch (err) {
//     console.log('Oops! there is an error');
//     console.error(err.stack);
//   }
// };

// const init = async () => {
//   try {
//     const friends = await friendsList();
//     console.log(chalk.inverse('seeded friends'));
//     friends.forEach((friend) => {
//       console.log('------');
//       console.log(friend.name);
//     });
//   } catch (err) {
//     console.log(err);
//     //conn.close();
//   }
// };

module.exports = {
  friendsList,
  conn,
  //init,
  models: {
    Friend,
  },
};

friendsList();
//init();
