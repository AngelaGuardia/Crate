import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../ui/button/Button';


const History = (props) => {
  let keptProducts = [];
  props.productsHistory.forEach(prod => {
    if (prod.kept === true) {
      keptProducts.push(prod)
    }
  })
  
  // const allProducts = props.productsHistory.map(prod => {
  //   //change this to return a Product component
  //   //need to set up action creator to retrieve all Products 
  //   //create array of productsHistory Ids to be cross referenced
  //   //find elements within Products whose Id is included in ^
  //   //connect the Products state to this History component
  //   return (
  //     <article>
        
  //     </article>
  //   )
  // })
  return (
    <section style={{ textAlign: 'center', display: 'grid', gridTemplateRows: '1fr 1fr 1fr', paddingTop: '5em' }}>
      <h1 style={{ gridRowStart: '1' }}>My Product History</h1>
      <article style={{ gridRowStart: '2' }}>
        {keptProducts.map(prod => <h1>{prod.productId}</h1>)}
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
    productsHistory: state.user.productsHistory.productsHistory
  }
}

export default connect(historyState)(History)

