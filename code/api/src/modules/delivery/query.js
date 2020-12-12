// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import DeliveryType from './types'
import { getAll } from './resolvers'

// Deliveries - All
export const deliveries = {
  type: new GraphQLList(DeliveryType),
  resolve: getAll
}
