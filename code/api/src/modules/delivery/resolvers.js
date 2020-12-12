// App Imports
import models from '../../setup/models'

// Get all deliveries
export async function getAll() {
  return await models.Delivery.findAll({
    include: [
      { model: models.User, as: 'user' },
      { model: models.Product, as: 'product' },
    ]
  })
}
