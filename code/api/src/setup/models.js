// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

// Lays out each model and completes connection to database
const models = {
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model')
}

// This creates model relationships and associations, essentially assigning
// indexes/keys to models based on how relationships are defined within
// individual models.
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
