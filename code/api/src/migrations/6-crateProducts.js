module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('crateProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      crateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crates',
          key: 'id'
        },
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('crateProducts');
  }
}
