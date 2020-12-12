import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';
import models from '../../../setup/models';


describe('Product Queries', () => {
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

  it('returns all products', async (done) => {
    const products = await models.Product.findAll({}).map(n => n.get({ plain: true}))

    const response = await request(server)
      .post('/graphql')
      .send({query: `{ products { id } }`})
      .expect(200)
    expect(response.body.data.products.length).toBe(products.length);
    done();
  })

  it('returns a by slug', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{product(slug:"belt-for-women") { id name } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data:{
        product: {
          id: 1,
          name: "Belt for Women"
        }
      }
    });
    done();
  })

  it('returns product by id', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{productById(productId: 1) { id name } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data:{
        productById: {
          id: 1,
          name: "Belt for Women"
        }
      }
    });
    done();
  })

  it.skip('returns related products', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{product(id: 1) { id name } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data:{
        peoduct: {
          id: 1,
          name: "Belt for Women"
        }
      }
    });
    done();
  })

  it('returns productTypes', async(done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: `{productTypes { id } }`})
      .expect(200)
    expect(response.body).toMatchObject({
      data:{
        productTypes: [{
          id: 1
        },
        {
          id: 2
        }]
      }
    });
    done();
  })
})
