// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import { UserType } from '../user/types'
import { ProductType } from '../product/types'

// Delivery type
const DeliveryType = new GraphQLObjectType({
  name: 'delivery',
  description: 'Delivery Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    product: { type: ProductType },
    kept: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default DeliveryType
