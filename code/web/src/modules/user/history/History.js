import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../ui/button/Button';


const History = (props) => {
  let keptProducts = props.deliveries.filter(prod => {
    prod.kept === true
  })
  let historyIds = props.deliveries.map(prod => prod.id)
  let userProds = props.products.filter(prod => historyIds.includes(prod.id))
  return (
    <section style={{ textAlign: 'center', display: 'grid', gridTemplateRows: '1fr 1fr 1fr', paddingTop: '5em' }}>
      <h1 style={{ gridRowStart: '1' }}>My Product History</h1>
      <article style={{ gridRowStart: '2' }}>
        {keptProducts.map(prod => <h1>{prod}</h1>)}
      </article>
      <article style={{ gridRowStart: '2' }}>
        {userProds.map(prod => <h1>{prod}</h1>)}
      </article>
      <article style={{ marginTop: '5em', gridRowStart: '3', display: 'flex', justifyContent: 'space-around' }}> 
        <Button theme='secondary'>All</Button>
        <Button theme='secondary'>Kept</Button>
        <Button theme='secondary'>Upcoming</Button>
      </article>
    </section>
  )
}

function historyState(state) {
  return {
    deliveries: state.user.deliveries,
    products: state.user.products
  }
}

export default connect(historyState )(History)

