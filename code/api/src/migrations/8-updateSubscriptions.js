'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.addColumn('subscriptions', 'nextDeliveryDate', Sequelize.DATE)
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.removeColumn('subscriptions', 'nextDeliveryDate', Sequelize.DATE)
    ])
  }
}
