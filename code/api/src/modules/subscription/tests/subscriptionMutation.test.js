import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';
import models from '../../../setup/models';

describe('Subscription Mutations', () => {
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

  // QUESTION: How to log in

  it.skip('Creates a new subscription', async (done) => {
    const initialSubscriptions = await models.Subscription.findAll({}).map(n => n.get({ plain: true}))
    const response2 = await request(server)
      .post('/graphql')
      .send({query: `mutation {subscriptionCreate(userId: 1, crateId: 1){id}}`})
      .expect(200)
    const newSubscriptions = await models.Subscription.findAll({}).map(n => n.get({ plain: true}))

    expect(newSubscriptions.length).toBe(initialSubscriptions.length + 1)
  })

  it.skip('Updates subscription', async (done) => {
    let subscription = await model.findOne({
    order: [ [ 'createdAt', 'DESC' ]]
    });

    const nextDeliveryDate = subscription.dataValues.nextDeliveryDate;
    expect(nextDeliveryDate).toBe(Null);
    const subscriptionId = subscription.dataValues.id;

    const response5 = await request(server)
      .post('/graphql')
      .send({query: `mutation {userUpdate(id: ${subscriptionId}, nextDeliveryDate: "Dec 12 2020"){id}}`})
      .expect(200)

    const updatedSubscription = await models.Subscription.findOne({where: { id: subscriptionId }})

    const updatedDate = updatedSubscription.dataValues.nextDeliveryDate
    expect(updatedDate).toBe("Cam");

    done();
  })

  it.skip('Removes subscription', async (done) => {
    let subscription = await model.findOne({
    order: [ [ 'createdAt', 'DESC' ]]
    });
    const subscriptionId = subscription.dataValues.id;

    const initialSubscriptions = await models.Subscription.findAll({}).map(n => n.get({ plain: true}))

    const response6 = await request(server)
      .post('/graphql')
      .send({query: `mutation {subscriptionRemove(id:${subscriptionId}){id}}`})
      .expect(200)

    const newSubscriptions = await models.Subscription.findAll({}).map(n => n.get({ plain: true}))

    expect(newSubscriptions.length).toBe(initialSubscriptions.length - 1)
    done();
  })
})
