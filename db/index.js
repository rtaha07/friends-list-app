const Sequelize = require('sequelize');
const chalk = require('chalk');
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/friends_list'
); //pass false to the logging parameter to prevent sequelize from outputting SQL to console on execution

const Friend = conn.define('friend', {
  name: {
    type: STRING,
    allowNull: false,
  },
  ranking: {
    type: INTEGER,
    defaultValue: 1,
  },
});

Friend.belongsTo(Friend);

const friendsList = async () => {
  try {
    await conn.sync({ force: true });
    console.log('Syncing success!');
    const friends = await Promise.all([
      await Friend.create({
        name: 'Sally',
        ranking: 1,
      }),
      await Friend.create({
        name: 'John',
        ranking: 2,
      }),
      await Friend.create({
        name: 'Khalid',
        ranking: 3,
      }),
      await Friend.create({
        name: 'Catherine',
        ranking: 4,
      }),
      await Friend.create({
        name: 'Adam',
        ranking: 5,
      }),
    ]);

    console.log(chalk.inverse('Seeding success!'));
    console.log(JSON.stringify(friends, null, 2));
  } catch (err) {
    console.error('Oh there is an error!');
    console.error(err.stack);
  }
  //conn.close();
};

module.exports = {
  friendsList,
  models: {
    Friend,
  },
};
