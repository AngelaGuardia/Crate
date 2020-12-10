import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateAvailability } from '../subscription/api/actions';

const Availability = (props) => {
  //change minDate from today's date to current delivery date from BE
  let minDate = moment().format('YYYY-MM-DD');
  let maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <article style={{ paddingRight: '2em' }}>
        <h3>Next Delivery: </h3>
        <h4>Available?</h4>
      </article>
      {/* refactor the following conditional render*/}
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
      user: state.user
    }
  }

export default connect(availabilityState, { updateAvailability })(Availability)
