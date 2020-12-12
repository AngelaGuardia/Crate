import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';
import models from '../../../setup/models';

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

  it('Creates a new user', async (done) => {
    const initialUsers = await models.User.findAll({}).map(n => n.get({ plain: true}))
    const response2 = await request(server)
      .post('/graphql')
      .send({query: `mutation {userSignup(name: "Nicolas", email: "nick@gmail.com", password: "123456"){id}}`})
      .expect(200)
    const newUsers = await models.User.findAll({}).map(n => n.get({ plain: true}))

    expect(newUsers.length).toBe(initialUsers.length + 1)
    const id = response2.body.data.userSignup.id
    const newUser = await models.User.findOne({where: { id }})
    expect(newUser.name).toBe("Nicolas");
    done();
  })

  it.skip('Updates user information', async (done) => {
    let user = await models.User.findOne({where: { email: "nick@gmail.com" }});
    const oldName = user.dataValues.name;
    expect(oldName).toBe("Nicolas");
    const userId = user.dataValues.id;

    const response5 = await request(server)
      .post('/graphql')
      .send({query: `mutation {userUpdate(id: ${userId}, name: "Cam", email: "c@gmail.com"){id name email}}`})
      .expect(200)

    const updatedUser = await models.User.findOne({where: { id: userId }})

    const newName = user.dataValues.name
    expect(newName).toBe("Cam");

    const newEmail = user.dataValues.name
    expect(newEmail).toBe("c@gmail.com");
    done();
  })

  it('Removes user', async (done) => {
    let user = await models.User.findOne({where: { email: "nick@gmail.com" }});

    const userId = user.dataValues.id;

    const initialUsers = await models.User.findAll({}).map(n => n.get({ plain: true}))

    const response6 = await request(server)
      .post('/graphql')
      .send({query: `mutation {userRemove(id:${userId}){id}}`})
      .expect(200)

    const newUsers = await models.User.findAll({}).map(n => n.get({ plain: true}))

    expect(newUsers.length).toBe(initialUsers.length - 1)
    done();
  })
})
