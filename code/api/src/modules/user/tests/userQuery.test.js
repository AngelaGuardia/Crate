import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('User Queries', () => {
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

  it('returns all users', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{ users { email } }`})
      .expect(200)
    console.log(response.body)
    expect(response.body.data.users.length).toBe(2);
    done();
  })

  it('returns a user based on id', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{user(id:1) { email name role createdAt } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data:{
        user: {
          email: 'admin@crate.com',
          name: 'The Admin',
          role: 'ADMIN',
          createdAt: '1607446274409'
        }
      }
    });
    expect(response.body.data.user.email).toBe('admin@crate.com');
    done();
  })
})
