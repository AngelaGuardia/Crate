import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('Subscription Queries', () => {
  let server;
  beforeAll(() => {
    server = express();
    server.use(
      "/",
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  })

  it('returns all subscriptions', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{ subscriptions { id } }`})
      .expect(200)
    expect(response.body.data.subscriptions.length).toBe(6);
    done();
  })

  // it.skip('returns a subscription by user', async(done) => {
  //   const response = await request(server)
  //     .post('/graphql')
  //     .send({query: `{subscription(auth) { id } }`})
  //     .expect(200)
  //   expect(response.body).toMatchObject({
  //     data:{
  //       subscriptions: {[]}
  //     }
  //   });
  //   expect(response.body.data.subscriptions.length).toBe(4);
  //   done();
  // })

  // QUESTION: Not sure how to make requests that require authentication

  it('subscription by id', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{ subscription(id: 1) { id } }`})
      .expect(200)
    console.log(response.body)
    expect(response.body).toMatchObject({
      data: {
        subscription:
          {
            id: 1,
          }
      }
    });
    done();
  })
})
