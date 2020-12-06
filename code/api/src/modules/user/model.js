'use strict'
// NOTE: 7.3 This is where the model is defined. It defines the user model and all its attributes and the type for each attribute

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription) // NOTE: This here defines the user relationships
    // TODO: add hasmany product_histories (deliveries?)
  }

  return User
}
