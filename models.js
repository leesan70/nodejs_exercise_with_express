const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'nodejs_exercise',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: console.log
  }
);

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  User: User
}