'use strict';

module.exports = { 
  up: async (queryInterface, Sequelize) => { 
    return Promise.all ([ 
      queryInterface.addColumn('users', 'description', Sequelize.STRING),    queryInterface.addColumn('users', 'image', Sequelize.STRING),    queryInterface.addColumn('users', 'address', Sequelize.STRING) 
    ]) 
  } ,
  down: async (queryInterface, Sequelize) => { 
    return Promise.all ([ 
      queryInterface.removeColumn('users', 'description', Sequelize.STRING),    queryInterface.removeColumn('users', 'image', Sequelize.STRING),    queryInterface.removeColumn('users', 'address', Sequelize.STRING) 
    ]) 
  }
}
