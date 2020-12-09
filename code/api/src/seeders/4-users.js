'use strict';

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The New Admin',
        email: 'newadmin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        description: 'I administer things',
        image: 'http://gph.is/2lnp32Z',
        address: '1111 1st St. Denver, CO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The new User',
        email: 'newuser@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        description: 'I use many things',
        image: 'http://gph.is/1cJFeeQ',
        address: '1112 2nd St. Denver, CO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Other User',
        email: 'otheruser@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        description: 'I use many other things',
        image: 'http://gph.is/1cJFeeQ',
        address: '1113 3rd St. Denver, CO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
