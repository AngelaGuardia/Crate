import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateAvailability } from '../subscription/api/actions';

const Availability = (props) => {
  let upcomingProds = props.subscriptionsByUser.list.filter(subscription => Date.now() < subscription.nextDeliveryDate).map(prod => prod.nextDeliveryDate)[0]
  let displayDate = new Date(+upcomingProds).toString().split(" ", 4).join(", ")
  let minDate = moment().format('YYYY-MM-DD');
  let maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <article style={{ paddingRight: '2em' }}>
        <h3>Next Delivery:  {displayDate || "No upcoming deliveries"} </h3>
      </article>
      {props.user.isEditMode && 
        (<article>
          <label htmlFor='select-availability'>
            Select Availability:
            <input onChange={event => props.updateAvailability(event.target.value)} type='date' min={minDate} max={maxDate}/>
          </label>
        </article>)}
    </section>
  )   
}

function availabilityState(state) {
    return {
      user: state.user,
      subscriptionsByUser: state.subscriptionsByUser,
    }
  }

export default connect(availabilityState, { updateAvailability })(Availability)
  
