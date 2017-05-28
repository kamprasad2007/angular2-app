const Sequelize = require('sequelize');
const config = require('./config');
const sequelize = new Sequelize(config.db_url);

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  isActive:{
      type: Sequelize.BOOLEAN
  }
});

module.exports =  User;