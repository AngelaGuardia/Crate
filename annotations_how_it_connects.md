### API - Backend - /api directory

- `/src/index.js` -> Express server is fired up here
- interesting to note that there's a different endpoint for uploads (`'/upload'`) that can be found in `src/config/server.json` file
  - two endpoints: `'/'` and `'/upload'`
- `graphql.js` file configures GraphQL with the endpoints by importing the endpoints (`src/config/server.json`), the authentication handling and token generation (`src/setup/authentication.js`) and the schema (`/src/setup/schema`)
- The schema defined in `src/setup/schema/index.js` pulls in the queries and mutations files within the `/src/setup/schema` directory
  - the schema is exported from here
  - each model/module (i.e user, product, subscription, crate) has its own mutations file and its own query file
  - think the spreader operator (`...`) within the `src/setup/schema/mutations.js` file is used to provide the schema file with access to all of the mutations for each model/module
  - upon importing each module at the top of the file, we pull in all the mutations for the schema
  - the queries work the same way with importing each module, then designating access to all the queries for each respective model
- Sequelize is the ORM for the database, similar to ActiveRecord with Ruby on Rails
- models are defined within `src/modules/<model_name>/model.js`
- `npm run setup` runs migrations and seeds the database

#### So what do we have to do?

- add description and shipping address to the model and type files for User and adjust migrations accordingly
- write a userUpdate mutation to be able to add the info of these attributes to a user
- write an update resolver to coincide with the mutation
- create tables for productHistory and crateProducts, add to the `src/setup/models.js` file, setup the respective `types.js` files and write migrations
- add unit tests for existing functionality as we also test the track that we're implementing

### Web - Frontend - /web directory

- each model has a `src/modules/<name>/api/actions.js` file that contains functions that facilitate `axios.post` requests to the backend Express API
- when frontend sends a request to backend, the corresponding queries or mutations on the backend have specific resolvers that handle how to send the response back
  - response is received by the original function in the `actions.js` file
