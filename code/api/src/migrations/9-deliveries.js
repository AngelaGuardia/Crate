'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('productsHistory', 'deliveries')
  },
  down:(queryInterface, Sequelize) => {
    //
  }
}
