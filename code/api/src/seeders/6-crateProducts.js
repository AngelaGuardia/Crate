'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('crateProducts', [
      {
        crateId: 1,
        productId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 1,
        productId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 2,
        productId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 2,
        productId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 3,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 3,
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 4,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 4,
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 5,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 5,
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 5,
        productId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 5,
        productId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 6,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 6,
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 6,
        productId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        crateId: 6,
        productId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('crateProducts', null, {});
  }
}
