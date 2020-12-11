'use strict'

// productsHistory
module.exports = function(sequelize, DataTypes) {
  let Delivery = sequelize.define('deliveries', {
    userId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    kept: {
      type: DataTypes.BOOLEAN
    }
  })

  Delivery.associate = function(models) {
    Delivery.belongsTo(models.User)
    Delivery.belongsTo(models.Product)
  }

  return Delivery
}
