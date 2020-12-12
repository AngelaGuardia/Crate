import React, {useState} from 'react';
import { connect } from 'react-redux';
import Button from '../../../ui/button/Button';


const History = (props) => {
  let allProducts, keptProducts, userProds, keptProds;
  const [keptView, toggleKeptView] = useState(false)
  if (props.deliveries){
  let historyIds = props.deliveries.filter(prod => prod.user.id === props.userId)
  let userProds = props.products.filter(prod => historyIds.some(id => id.id === prod.id))
  let keptDelivery = historyIds.filter(prod => prod.kept)
  let keptProds = props.products.filter(prod => keptDelivery.some(delivery => delivery.id === prod.id))
    console.log(userProds, keptProds)
  allProducts=
        userProds.map(prod => {
        return (<article style={{ gridRowStart: '2' }}>
                  <h3>{prod.slug}</h3>
                </article>)})

  keptProducts=
        keptProds.map(prod => {
        return (<article style={{ gridRowStart: '2' }}>
                  <h3>{prod.slug}</h3>
                </article>)})
  }
  const toggleKept = ()=>{
    toggleKeptView( !keptView )
  }
  return (
    <section style={{ textAlign: 'center', display: 'grid', gridTemplateRows: '1fr 1fr 1fr', paddingTop: '5em' }}>
      <h1 style={{ gridRowStart: '1' }}>My Product History</h1>
      {keptView ? keptProducts : allProducts}
      <article style={{ marginTop: '5em', gridRowStart: '3', display: 'flex', justifyContent: 'space-around' }}> 
        <Button onClick={toggleKept}theme='secondary'>{keptView ? "All": "Kept"}</Button>
        <Button theme='secondary'>Upcoming</Button>
      </article>
    </section>
  )
}

function historyState(state) {
  return {
    userId: state.user.details.id,
    deliveries: state.user.deliveries,
    products: state.user.products
  }
}

export default connect(historyState )(History)

