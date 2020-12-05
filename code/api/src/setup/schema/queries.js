// NOTE: 5. This is where we start to define queries
// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
// NOTE: queries are imported for each type of resource
import * as user from '../../modules/user/query'
import * as product from '../../modules/product/query'
import * as crate from '../../modules/crate/query'
import * as subscription from '../../modules/subscription/query'

// Query
// NOTE: The main query object is defined here. It includes queries from all resources.
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...product,
    ...crate,
    ...subscription
  })
})

export default query
