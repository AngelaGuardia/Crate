import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';
import models from '../../../setup/models';

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
    const initialUsers = await models.User.findAll({}).map(n => n.get({ plain: true}))

    const response = await request(server)
      .post('/graphql')
      .send({query: `{ users { email } }`})
      .expect(200)
    expect(response.body.data.users.length).toBe(initialUsers.length);
    done();
  })

  it('returns a user based on id', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{user(id:1) { email name role } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data:{
        user: {
          email: 'admin@crate.com',
          name: 'The Admin',
          role: 'ADMIN'
        }
      }
    });
    expect(response.body.data.user.email).toBe('admin@crate.com');
    done();
  })

  it('returns user genders', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{ userGenders { id name } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data: {
        userGenders: [
          {
            id: 1,
            name: "Male"
          },
          {
            id: 2,
            name: "Female"
          }
        ]
      }
    });
    done();
  })

  it('returns userLogin token', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{userLogin(email: "admin@crate.com", password: "123456") {token}}`})
      .expect(200)
    expect(typeof response.body.data.userLogin.token).toBe('string');
    done();
  })
})
