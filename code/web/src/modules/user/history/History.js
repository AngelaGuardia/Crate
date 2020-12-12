import React, {useState} from 'react';
import { connect } from 'react-redux';
import Button from '../../../ui/button/Button';
import { routeImage, routes } from '../../../setup/routes'


const History = (props) => {
  let allProducts, keptProducts, userProds, keptProds;
  const [keptView, toggleKeptView] = useState(false)
  if (props.deliveries){
  let historyIds = props.deliveries.filter(prod => prod.user.id === props.userId)
  let userProds = props.products.filter(prod => historyIds.some(id => id.id === prod.id))
  let keptDelivery = historyIds.filter(prod => prod.kept)
  let keptProds = props.products.filter(prod => keptDelivery.some(delivery => delivery.id === prod.id))
    console.log(keptProds)
  allProducts=
        userProds.map(prod => {
          return (<article style={{ border:'solid', width:"10em", marginRight:"1em"}}>
                  <h3>{prod.name}</h3>
                  <img src={routeImage + prod.image} alt={prod.description} style={{ width: '100%' }}/>
                  <h3>{prod.description}</h3>
                </article>)})

  keptProducts=
        keptProds.map(prod => {
          return (<article style={{  border:'solid',  width:"10em", marginRight:"1em"}}>
                  <h3>{prod.name}</h3>
                  <img src={routeImage + prod.image} alt={prod.description} style={{ width: '100%' }}/>
                  <h3>{prod.description}</h3>
                </article>)})
  }
  const toggleKept = ()=>{
    toggleKeptView( !keptView )
  }
  return (
    <section style={{ textAlign: 'center', display: 'flex', flexDirection: "column", alignItems:"center", gridTemplateRows: '1fr 1fr 1fr', justifyContent:'center', paddingTop: '5em' }}>
      <h1 style={{marginBottom:"2em"}}>My Product History</h1>
      <section style={{display:"flex", flexDirection:"row"}}>{keptView ? keptProducts : allProducts}</section>
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

