const Sequelize = require('sequelize');
const chalk = require('chalk');
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/friends_list'
);

const Friend = conn.define('friend', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: INTEGER,
    defaultValue: 5,
    allowNull: false,
  },
});

const friendsList = async () => {
  try {
    await conn.sync({ force: true });
    console.log(chalk.inverse('Syncing success!'));
    const friends = await Promise.all([
      await Friend.create({
        name: 'Sally',
        rating: 1,
      }),
      await Friend.create({
        name: 'John',
        rating: 2,
      }),
      await Friend.create({
        name: 'Khalid',
        rating: 3,
      }),
      await Friend.create({
        name: 'Catherine',
        rating: 4,
      }),
      await Friend.create({
        name: 'Adam',
        rating: 5,
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
