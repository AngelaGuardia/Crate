// Migrations have to have an up and a down. This one specifically creates the
// Users table with Sequelize as the ORM.
// It seems like we'll have to create new migration to add image, description
// and address columns to the Users table, perhaps using
// addColumn('users'...etc...). Also add nextDeliveryDate to Subscriptions for
// the adjusting availability piece of this project track.
// We will generate new migrations to create tables for productHistory and
// crateProducts, which will act as joins tables for us. The productHistory can
// associate users with their products and have a column like kept? to set a
// boolean on whether or not the user kept the item from the crate.
// The crateProducts can associate crates with the products they contain.
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('users');
  }
}
