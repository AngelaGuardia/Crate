// NOTE: 7.4 This is where the User mutations are defined
// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}
// NOTE: This mutation allows a user to sign up. It is of UserType, it takes name, email, password. All of which are of type string - goes to create resolver


// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
// NOTE: This mutation removes a user from the DB

// TODO: Add an update mutation that allows user to update most/all of their info
