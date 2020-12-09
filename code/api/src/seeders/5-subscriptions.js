'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subscriptions', [
      {
        userId: 1,
        crateId: 1,
        nextDeliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        crateId: 3,
        nextDeliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        crateId: 2,
        nextDeliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        crateId: 4,
        nextDeliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        crateId: 5,
        nextDeliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        crateId: 6,
        nextDeliveryDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subscriptions', null, {});
  }
}
