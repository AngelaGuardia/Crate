'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('delivery', [
      {
        userId: 1,
        productId: 7,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        productId: 8,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        productId: 5,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        productId: 6,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 2,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 4,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 1,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 3,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 2,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 4,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 7,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 8,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 1,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 3,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 5,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 6,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('delivery', null, {});
  }
}
