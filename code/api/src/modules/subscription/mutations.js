// Imports
import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql'

// App Imports
import SubscriptionType from './types'
import { create, remove, update } from './resolvers'

// Subscription create
export const subscriptionCreate = {
  type: SubscriptionType,
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Subscription update
export const subscriptionUpdate = {
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    nextDeliveryDate: {
      name: 'nextDeliveryDate',
      type: GraphQLString
    }
  },
  resolve: update
}

// Subscription remove
export const subscriptionRemove = {
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
