import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('User Mutations', () => {
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

  it('Checks the current number of users is 5', async (done) => {
      const response1 = await request(server)
        .post('/graphql')
        .send({query: `{ users { email } }`})
        .expect(200)
      const initialUsers = response1.body.data.users.length
      expect(response1.body.data.users.length).toBe(initialUsers);
      done();
    })

  it('Creates a new user', async (done) => {
    const response2 = await request(server)
      .post('/graphql')
      .send({query: `mutation {userSignup(name: "Nicolas", email: "nick@gmail.com", password: "123456"){id}}`})
      .expect(200)
    const newUserId = response2.body.data.userSignup.id
    expect(response2.body.data.userSignup.id).toBe(newUserId);
    done();
  })

  it('Checks the number of users increased to 6', async (done) => {
  const response3 = await request(server)
    .post('/graphql')
    .send({query: `{ users { email } }`})
    .expect(200)
  const newUsers = response3.body.data.users.length
  expect(newUsers).toBe(initialUsers + 1);
  done();
  })

  it('Check that the new user has the corrent attributes', async (done) => {
  const response4 = await request(server)
    .post('/graphql')
    .send({query: `{user(id:${newUserId}) { email name } }`})
    .expect(200)
  expect(response4.body).toMatchObject({
    data:{
      user: {
        email: 'nick@gmail.com',
        name: 'Nicolas',
      }
    }
  });
  expect(response4.body.data.user.email).toBe('nick@gmail.com');
  done();
  })

  it('Updates user information', async (done) => {
  const response5 = await request(server)
    .post('/graphql')
    .send({query: `mutation {userUpdate(id: ${newUserId}, name: "Cam", email: "c@gmail.com"){id name email}}`})
    .expect(200)
  expect(response5.body.data.userUpdate.name).toBe("Cam");
  expect(response5.body.data.userUpdate.email).toBe("c@gmail.com");
  done();
  })

  it('Removes user', async (done) => {
  const response6 = await request(server)
    .post('/graphql')
    .send({query: `mutation {userRemove(id:${newUserId}){id}}`})
    .expect(200)
  expect(response6.body.data.userRemove.id).toBe(Null);
  done();
  })

  it('Checks that the number of users is back to 5', async (done) => {
  const response7 = await request(server)
    .post('/graphql')
    .send({query: `{ users { email } }`})
    .expect(200)
  expect(response7.body.data.users.length).toBe(newUsers - 1);
  done();
  })
})
