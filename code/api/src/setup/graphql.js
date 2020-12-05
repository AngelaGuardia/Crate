// NOTE: 3. This is where graphql is being set up
// Imports
import graphqlHTTP from 'express-graphql'

// App Imports
import serverConfig from '../config/server.json'

import authentication from './authentication'
// NOTE: This is the first place where we use authentication. We will need access to this endpoint without authentication in some cases or we may need to create a new endpoint.

import schema from './schema'
// QUESTION: How is it importing a variable from an entire folder like this?

// Setup GraphQL
export default function (server) {
  console.info('SETUP - GraphQL...')

  server.use(authentication)

  // API (GraphQL on route `/`)
  server.use(serverConfig.graphql.endpoint, graphqlHTTP(request => ({
    schema,
    graphiql: serverConfig.graphql.ide,
    pretty: serverConfig.graphql.pretty,
    context: {
      auth: {
        user: request.user,
        isAuthenticated: request.user && request.user.id > 0
      }
    }
  })))
}
