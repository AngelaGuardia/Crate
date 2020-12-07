import React from 'react';
import moment from 'moment';

export const Availability = () => {
  let minDate = moment().format('YYYY-MM-DD');
  let maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <article style={{ paddingRight: '2em' }}>
        <h3>Next Delivery: </h3>
        <h4>Available?</h4>
      </article>
      <article>
        <label htmlFor='select-availability'>
          Select Availability:
          <input type='date' min={minDate} max={maxDate}/>
        </label>
      </article>
    </section>
  )   
}