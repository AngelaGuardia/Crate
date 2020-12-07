import React from 'react';
import moment from 'moment';

export const Availability = () => {
  let futureDate = moment().add(7, 'days').format('YYYY-MM-DD');
  return (
    <article>
      <label htmlFor='select-availability'>
        Select Availability:
        <input type='date' min={Date.now()} max={futureDate}/>
      </label>
    </article>
  )   
}