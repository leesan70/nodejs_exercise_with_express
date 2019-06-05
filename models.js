const Sequelize = require('sequelize');
const config = require('./config/environments');
const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: null
  }
)

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  User: User
}