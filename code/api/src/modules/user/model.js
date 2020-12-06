'use strict'

// User - defines model with attributes. Each attribute must have its data type
// defined.
// Image, description and address will need to be added here
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
  // designates the association between Users and Subscriptions
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
