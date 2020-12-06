// NOTE: 7.0 User queries
// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
// NOTE: Imports GraphQL types

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
// NOTE: Imports user specific types
import { getAll, getById, login, getGenders } from './resolvers'
// NOTE: Imports user specific resolvers

// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}
// NOTE: creates a user query that is of type List of Users and calls the 'getAll' resolver

// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}
// NOTE: creates a user query that is of UserType and take a ID argument of type GraphQLInt. calls the getById resolver

// Auth
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString // TODO: Remove this? it's not actually used in the resolver so the query works without it
    }
  },
  resolve: login
}
// NOTE: This query allows a user to log in. It is defined as a UserLoginType and takes three arguments: email, password, role that are all GraphQLString types and gets sent to the login resolver

// Genders
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
// NOTE: gets user genders as a list of gender types - resolves to the getGenders resolver
